### `npm start`
<<<<<<< HEAD

=======
>>>>>>> 0c090b006f1037f8adae0b0b0a2101bef04a3241
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

This is the front end for the Epoll app. built by using the reactJs and libraries such as axios and semantic UI.
Not using node.js as our backend is built on c# as it was requested
This Single page application and using ternary operation to handle the logic in changing the components to the corresponding ones.

<<<<<<< HEAD
we are using useStates to follow the flow of the app (conditionals) and store our db data
=======
we are using useStates to follow the flow of the app (conditionals) and store our db data 
>>>>>>> 0c090b006f1037f8adae0b0b0a2101bef04a3241

    const [epolls, setEpolls] = useState([]);
    const [SelectedPoll, setSelectedPoll] = useState(undefined);
    const [editMode, setEditMode] = useState(false); //to open the create form
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [updateRequest, setUpdateRequest] = useState(false);

App starts with the following

    useEffect(() => {
      try {
        agent.Polls.list().then(response => {
        setEpolls(response);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
    }, [updateRequest]);

fetch data with axios from the end point that has been stored in agent.js file in order to avoid repetition : and looks something like this

    axios.defaults.baseURL = "http://localhost:5000/Polls";

    axios.interceptors.response.use(async response => {
     try {
    await sleep(1000);
    return response;
    } catch (error) {
    console.log(error);
    return await Promise.reject(error);
    }
    });

    const responseBody = response => response.data;

    const requests = {
     get: url => axios.get(url).then(responseBody)
    };

    const Polls = {
     list: () => requests.get("/"),
    };
    const agent = {
    Polls
    };
    export default agent;
<<<<<<< HEAD

naturally this also holds the post and put requests etc.

In the app we are returning our frontpage like this and passing props to our components

    return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <PollDashboard props={epolls}
        selectedPoll={SelectedPoll}
        selectPoll={handleSelectPoll}
        cancelSelectPoll={handleCancelSelectPoll}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrVote={handleCreateOrVotePoll}
        submitting={submitting} />
      </Container>
    </>
    );

Polldashboard is the central hub for the components

1. Poll list is handles mapping our polls from the db
2. Polldetails handles displaying the title and options and its data
3. Poll form on the otherhands allows user to create a poll
   depending wheter select or editmode it displays either one or in some cases : both


    function PollDashboard({ props, selectedPoll, selectPoll, cancelSelectPoll, editMode, closeForm, openForm, createOrVote, submitting }) {
     return (
    <>
      <Header as="h2">Latest Polls</Header>
      <Grid>
        <Grid.Column width="10">
          <PollList epolls={props} selectPoll={selectPoll} />
        </Grid.Column>
        <Grid.Column width="6">
          {selectPoll && <PollDetails epoll={selectedPoll} cancelSelectPoll={cancelSelectPoll} openForm={openForm} createOrVote={createOrVote} submitting={submitting}      />}
          {editMode && <PollForm closeForm={closeForm} epoll={selectedPoll} createOrVote={createOrVote} submitting={submitting} />}
        </Grid.Column>
      </Grid>
    </>
    );
    }

in the polldetails : create initial state of epoll to change the value with the selected check box value as the options[index].count is by the same index values
once clicking vote button we are just adding counts++ so increment the current value by one, then passing it to createOrVote that decides whethever the poll has id
and passes it to put / post endpoint
pressing the cancel on the otherhand turns the form off as cancelselectpoll comes to true

    function PollDetails({ epoll, cancelSelectPoll, openForm, createOrVote, submitting, hasVoted }) {
     const [value, setValue] = useState(0);
    var initialState = epoll;

     function handleSubmit() {

    initialState.options[value].counts++;

    createOrVote(initialState);
    }
    return (
    <>
      {epoll && (
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Card fluid>
            <Card.Content>
              <Card.Header>{epoll.title}</Card.Header>
              {epoll.options.map((option, index) => (
                <Form.Field key={index}>
                  <Checkbox radio id={option.id} label={`${option.title}    { ${option.counts} } : Votes`} name="options" value={index} checked={value === index}                           onChange={(e, data) => setValue(data.value)} />
                </Form.Field>
              ))}
            </Card.Content>
            <Card.Content extra>
              <Button.Group widths="2">
                <Button type="submit" basic color="blue" content="Vote" />
                <Button onClick={cancelSelectPoll} basic color="grey" content="Cancel" />
              </Button.Group>
            </Card.Content>
          </Card>
        </Form>
      )}
    </>
     );

In the pollform component : user can create a poll with title and options as many as he wants as we create the options object dynamically
in here we have 2 onchange

1.  handles the title of the poll
2.  other ones handles the options inputs.
3.  adding options has also delete option
    on submitting we are going to create a new m={} object that stores the input and poll useStates and passes it to the createOrVote function as this doesnt have an id
    it will a post request and we dont need to assign the main id as mongoDB handles it

              function PollForm({ closeForm, epoll, createOrVote, submitting }) {
              const [i, setI] = useState(0);

           const [input, setInput] = useState([
            {
           title: "",
            id: i,
           counts: 0
            }
             ]);

            const initialState = epoll ?? {
           title: "",
            id: ""
            };

            //this will be our final object that we send to the database
            var m;
            const [poll, setPoll] = useState(initialState);

           useEffect(() => {
            setI(i + 1);
           }, []);


           //create func that handles the button add
           const handleButtonAdd = () => {
           setInput([...input, { title: "", id: i, counts: 0 }]);
           setI(i + 1);
           };


           const handleDelete = index => {
           const list = [...input];
           list.splice(index, 1);
           setInput(list);
            };


           function handleInputChange(event) {
           const { name, value } = event.target;
            setPoll({ ...poll, [name]: value });
            }


            const handleOptionChange = (e, index) => {
           const { name, value } = e.target;
            const list = [...input];
           list[index][name] = value;
           setInput(list);

            };
           //on submit create new  obj
            function handleSubmit() {
            m = {
             id: poll.id,
              title: poll.title,
              options: input
            };

           createOrVote(m);
           }

           return (
            <>
            <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
              <Form.Input placeholder="Title" value={poll.title} name="title" onChange={handleInputChange} />
              {input.map((singleInput, index) => (
                <div key={index}>
                  {input.length > 1 && (
                    <Button size="mini" basic color="red" floated="right" onClick={() => handleDelete(index)}>
                      <Icon name="delete" />
                    </Button>
                  )}

                  <Form.Input id={singleInput.id} name="title" placeholder="Option" value={input.title} onChange={e => handleOptionChange(e, index)} />
                  {input.length - 1 === index && (
                    <Button floated="right" size="mini" basic color="green" onClick={handleButtonAdd}>
                      <Icon name="add circle" />
                    </Button>
                  )}
                </div>
              ))}
=======
    
   naturally this also holds the post and put requests etc.
   
   In the app we are returning our frontpage like this and passing props to our components 
   
    return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <PollDashboard props={epolls} 
        selectedPoll={SelectedPoll} 
        selectPoll={handleSelectPoll} 
        cancelSelectPoll={handleCancelSelectPoll}
        editMode={editMode} 
        openForm={handleFormOpen} 
        closeForm={handleFormClose}
        createOrVote={handleCreateOrVotePoll}
        submitting={submitting} />
      </Container>
    </>
    );
    
  Polldashboard is the central hub for the components  
  1. Poll list is handles mapping our polls from the db 
  2. Polldetails handles displaying the title and options and its data
  3. Poll form on the otherhands allows user to create a poll 
  depending wheter select or editmode it displays either one or in some cases : both
  
    function PollDashboard({ props, selectedPoll, selectPoll, cancelSelectPoll, editMode, closeForm, openForm, createOrVote, submitting }) {
     return (
    <>
      <Header as="h2">Latest Polls</Header>
      <Grid>
        <Grid.Column width="10">
          <PollList epolls={props} selectPoll={selectPoll} />
        </Grid.Column>
        <Grid.Column width="6">
          {selectPoll && <PollDetails epoll={selectedPoll} cancelSelectPoll={cancelSelectPoll} openForm={openForm} createOrVote={createOrVote} submitting={submitting}      />}
          {editMode && <PollForm closeForm={closeForm} epoll={selectedPoll} createOrVote={createOrVote} submitting={submitting} />}
        </Grid.Column>
      </Grid>
    </>
    );
    }
  
  
   in the polldetails : create initial state of epoll to change the value with the selected check box value as the options[index].count is by the same index values
   once clicking vote button we are just adding counts++ so increment the current value by one, then passing it to createOrVote that decides whethever the poll has id
   and passes it to put / post endpoint
   pressing the cancel on the otherhand turns the form off as cancelselectpoll comes to true
   
   
    function PollDetails({ epoll, cancelSelectPoll, openForm, createOrVote, submitting, hasVoted }) {
     const [value, setValue] = useState(0);
    var initialState = epoll;
    
     function handleSubmit() {
   
    initialState.options[value].counts++;

    createOrVote(initialState);
    }
    return (
    <>
      {epoll && (
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Card fluid>
            <Card.Content>
              <Card.Header>{epoll.title}</Card.Header>
              {epoll.options.map((option, index) => (
                <Form.Field key={index}>
                  <Checkbox radio id={option.id} label={`${option.title}    { ${option.counts} } : Votes`} name="options" value={index} checked={value === index}                           onChange={(e, data) => setValue(data.value)} />
                </Form.Field>
              ))}
            </Card.Content>
            <Card.Content extra>
              <Button.Group widths="2">
                <Button type="submit" basic color="blue" content="Vote" />
                <Button onClick={cancelSelectPoll} basic color="grey" content="Cancel" />
              </Button.Group>
            </Card.Content>
          </Card>
        </Form>
      )}
    </>
     );
 
In the pollform component : user can create a poll with title and options as many as he wants as we create the options object dynamically
in here we have 2 onchange 
1) handles the title of the poll
2) other ones handles the options inputs. 
3) adding options has also delete option
on submitting we are going to create a new m={} object that stores the input and poll useStates and passes it to the createOrVote function as this doesnt have an id 
it will a post request and we dont need to assign the main id as mongoDB handles it 




          function PollForm({ closeForm, epoll, createOrVote, submitting }) {
          const [i, setI] = useState(0);
       
       const [input, setInput] = useState([
        {
       title: "",
        id: i,
       counts: 0
        }
         ]);

        const initialState = epoll ?? {
       title: "",
        id: ""
        };
        
        //this will be our final object that we send to the database
        var m;
        const [poll, setPoll] = useState(initialState);

       useEffect(() => {
        setI(i + 1);
       }, []);
       
      
       //create func that handles the button add
       const handleButtonAdd = () => {
       setInput([...input, { title: "", id: i, counts: 0 }]);
       setI(i + 1);
       };

   
       const handleDelete = index => {
       const list = [...input];
       list.splice(index, 1);
       setInput(list);
        };

     
       function handleInputChange(event) {
       const { name, value } = event.target;
        setPoll({ ...poll, [name]: value });
        }
  
        
        const handleOptionChange = (e, index) => {
       const { name, value } = e.target;
        const list = [...input];
       list[index][name] = value;
       setInput(list);
    
        };
       //on submit create new  obj
        function handleSubmit() {
        m = {
         id: poll.id,
          title: poll.title,
          options: input
        };
  
       createOrVote(m);
       }

       return (
        <>
        <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Form.Input placeholder="Title" value={poll.title} name="title" onChange={handleInputChange} />
          {input.map((singleInput, index) => (
            <div key={index}>
              {input.length > 1 && (
                <Button size="mini" basic color="red" floated="right" onClick={() => handleDelete(index)}>
                  <Icon name="delete" />
                </Button>
              )}

              <Form.Input id={singleInput.id} name="title" placeholder="Option" value={input.title} onChange={e => handleOptionChange(e, index)} />
              {input.length - 1 === index && (
                <Button floated="right" size="mini" basic color="green" onClick={handleButtonAdd}>
                  <Icon name="add circle" />
                </Button>
              )}
            </div>
          ))}

        
>>>>>>> 0c090b006f1037f8adae0b0b0a2101bef04a3241

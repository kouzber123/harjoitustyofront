import React, { useEffect, useState } from "react";
import { Button, Form, Icon, Segment } from "semantic-ui-react";

//THIS WORKS AS INTENTED
function PollForm({ closeForm, epoll, createOrVote, submitting }) {
  const [i, setI] = useState(0);

  //in order to create input field dynamically
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

  //spread operator prev arr obj
  const handleDelete = index => {
    const list = [...input];
    list.splice(index, 1);
    setInput(list);
  };

  //everytime value changes
  function handleInputChange(event) {
    const { name, value } = event.target;
    setPoll({ ...poll, [name]: value });
  }

  //deconstruct name and value > tutke in the [{title}]
  //using the event.target.value   this has to be separate from above changeinput because this determines the addbutton too
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
    //we can either do usestate or object
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

          <Button.Group floated="left">
            <Button loading={submitting} positive type="submit" content="Submit" style={{ marginTop: "10px" }} />
            <Button onClick={closeForm} type="button" content="Cancel" style={{ marginTop: "10px" }} />
          </Button.Group>
        </Form>
      </Segment>
    </>
  );
}

export default PollForm;

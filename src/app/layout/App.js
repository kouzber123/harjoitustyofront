import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../Components/Navbar";
import PollDashboard from "../Components/Dashboard/PollDashboard";
import agent from "../Api/agent";
import LoadingComponent from "../Components/LoadingComponent";
function App() {
  //set usestate as empty array
  const [epolls, setEpolls] = useState([]);
  const [SelectedPoll, setSelectedPoll] = useState(undefined);
  const [editMode, setEditMode] = useState(false); //to open the create form
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [updateRequest, setUpdateRequest] = useState(false);
  //create list of the api so

  //updates the page every time changes occur
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

  //get selected poll by id
  function handleSelectPoll(id) {
    setSelectedPoll(epolls.find(x => x.id === id));
  }

  //by pressing onclick btn cancel set to undefined
  function handleCancelSelectPoll() {
    setSelectedPoll(undefined);
  }

  //ternary operation we check if we have anything in the id then envoke if true or false we set undefined
  function handleFormOpen(id) {
    id ? handleSelectPoll(id) : handleCancelSelectPoll();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }
  //existing epolls then filter it and x goes to x id is not eq poll.id  pass new updated poll
  function handleCreateOrVotePoll(poll) {
    setSubmitting(true);
    if (poll.id) {
      agent.Polls.update(poll).then(() => {
        setEpolls([...epolls.filter(x => x.id !== poll.id), poll]);
        setSelectedPoll(poll);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      agent.Polls.create(poll).then(() => {
        setEpolls([...epolls, poll]);
        setUpdateRequest(prevState => !prevState);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  } // we can open the details of polls and displauy it

  //while this is true
  if (loading) return <LoadingComponent content="Loading app  👈(ﾟヮﾟ👈)" />;
  //passs the epollsdata as property
  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <PollDashboard props={epolls} selectedPoll={SelectedPoll} selectPoll={handleSelectPoll} cancelSelectPoll={handleCancelSelectPoll} editMode={editMode} openForm={handleFormOpen} closeForm={handleFormClose} createOrVote={handleCreateOrVotePoll} submitting={submitting} />
      </Container>
    </>
  );
}

export default App;

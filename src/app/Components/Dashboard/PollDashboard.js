import { useState } from "react";
import { Grid } from "semantic-ui-react";
import PollDetails from "../Details/PollDetails";
import PollForm from "../Form/PollForm";
import PollList from "./PollList";

//deconstruct the property and pass it to poll list

//drop props to another level and passing our functions into dashboard
function PollDashboard({ props, selectedPoll, selectPoll, cancelSelectPoll, editMode, closeForm, openForm, createOrVote, submitting }) {

  return (
    <>
      <Grid>
        <Grid.Column width="10">
          <PollList epolls={props} selectPoll={selectPoll} />
        </Grid.Column>
        <Grid.Column width="6">
          {selectPoll && <PollDetails epoll={selectedPoll} cancelSelectPoll={cancelSelectPoll} openForm={openForm} createOrVote={createOrVote} submitting={submitting} />}
          {editMode && <PollForm closeForm={closeForm} epoll={selectedPoll} createOrVote={createOrVote} submitting={submitting} />}
        </Grid.Column>
      </Grid>
    </>
  );
}

export default PollDashboard;

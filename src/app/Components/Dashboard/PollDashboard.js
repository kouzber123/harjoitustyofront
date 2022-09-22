import React from "react";
import { Grid } from "semantic-ui-react";
import PollDetails from "../Details/PollDetails";
import PollForm from "../Form/PollForm";
import PollList from "./PollList";

//deconstruct the property and pass it to poll list

//drop props to another level
function PollDashboard({ props }) {
  return (
    <>
      <Grid>
        <Grid.Column width="10">
          <PollList epolls={props} />
        </Grid.Column>
        <Grid.Column width="6">
          {props[0] && <PollDetails epolls={props[0]} />}
          <PollForm />
        </Grid.Column>
      </Grid>
    </>
  );
}

export default PollDashboard;

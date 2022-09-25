import React, { useEffect, useState } from "react";
import { Button, Card, Checkbox, Form } from "semantic-ui-react";

//in Polldashboard
// use ternary operation to confirm if epolls has data then do

function PollDetails({ epoll, cancelSelectPoll, openForm, createOrVote, submitting, hasVoted }) {
  const [value, setValue] = useState(0);
  var initialState = epoll;

  // console.log(cancelSelectPoll);
  // const [value, setValue] = useState();
  function handleSubmit() {
    // console.log(list[value]);
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
                  <Checkbox radio id={option.id} label={option.title + " | [" + option.counts + "]"} name="options" value={index} checked={value === index} onChange={(e, data) => setValue(data.value)} />
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
}
export default PollDetails;

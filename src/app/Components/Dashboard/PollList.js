import React from "react";
import { Button, Item, Segment } from "semantic-ui-react";

//map through the epolls and pass id to the select poll func
function PollList({ epolls, selectPoll }) {
  return (
    <>
      {epolls && (
        <Segment>
          <Item.Group divided>
            {epolls.map((epolls, index) => (
              <Item key={index}>
                <Item.Content>
                  <Item.Header as="a">{epolls.title}</Item.Header>

                  <Button onClick={() => selectPoll(epolls.id)} floated="right" content="View" color="blue" />
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </Segment>
      )}
    </>
  );
}

export default PollList;

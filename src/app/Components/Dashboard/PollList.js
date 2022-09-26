import React from "react";
import { Button, Item, Segment } from "semantic-ui-react";

//map through the epolls and pass id to the select poll func and check first that epolls contain data first

//button will open the page to vote as we pass the id to find it from the epolls data
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

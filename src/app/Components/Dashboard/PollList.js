import React from "react";
import { Button, Item, Label, List, Segment } from "semantic-ui-react";

function PollList({ epolls }) {
  return (
    <>
      <Segment>
        <Item.Group divided>
          {epolls.map(epolls => (
            <Item key={epolls.id}>
              <Item.Content>
                <Item.Header as="a">{epolls.title}</Item.Header>
                <Item.Extra>
                  <Button floated="right" content="View" color="blue" />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
      <List></List>
    </>
  );
}

export default PollList;

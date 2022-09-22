import React, { useEffect } from "react";
import { Button, Card, Checkbox, Form, Icon, Image } from "semantic-ui-react";

function PollDetails({ epolls }) {
  const [value, setValue] = React.useState(Boolean);
  return (
    <>
      <Card fluid>
        <Card.Content>
          <Card.Header>{epolls.title}</Card.Header>
          <Form>
            <Form.Field>
              Selected value: <b>{value}</b>
            </Form.Field>
            <Form.Field>
              <Checkbox radio label={epolls.options[0].title} name="checkboxRadioGroup" value="2" checked={value === true} onChange={(e, data) => setValue(data.value)} />
            </Form.Field>
            <Form.Field>
              <Checkbox radio label={epolls.options[1].title} name="checkboxRadioGroup" value="1" checked={value === true} onChange={(e, data) => setValue(data.value)} />
            </Form.Field>
          </Form>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths="2">
            <Button basic color="blue" content="Vote" />
            <Button basic color="grey" content="Cancel" />
          </Button.Group>
        </Card.Content>
      </Card>
    </>
  );
}

export default PollDetails;

import React, { useEffect, useState } from "react";
import { Button, Form, Icon, Segment } from "semantic-ui-react";

function PollForm() {
  const [i, setI] = useState(0);
  //in order to create input field dynamically
  const [options, setOption] = useState([{ id: i, title: "" }]);
  console.log(options);

  //init value as one
  useEffect(() => {
    setI(i + 1);
  }, []);
  //create func that handles the button add
  const handleButtonAdd = () => {
    setOption([...options, { id: i, title: "" }]);
    setI(i + 1);
  };

  //spread operator prev arr obj
  const handleDelete = index => {
    const list = [...options];
    list.splice(index, 1);
    setOption(list);
  };

  //deconstruct name and value > tutke in the [{title}]
  //using the event.target.value
  const handleOptionChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...options];
    list[index][name] = value;

    setOption(list);
  };
  return (
    <>
      <Segment clearing>
        <Form>
          <Form.Input placeholder="Title" />
          {options.map((singleOption, index) => (
            <div key={index}>
              {options.length > 1 && (
                <Button size="mini" basic color="red" floated="right" onClick={() => handleDelete(index)}>
                  <Icon name="delete" />
                </Button>
              )}

              <Form.Input id={singleOption.id} name="title" placeholder="Option" value={singleOption.title} onChange={e => handleOptionChange(e, index, singleOption.id)} />
              {/* <Option props={singleOption} id={index} value={singleOption.title} onChange={e => handleOptionChange(e, index)} /> */}

              {options.length - 1 === index && (
                <Button floated="right" size="mini" basic color="green" onClick={handleButtonAdd}>
                  <Icon name="add circle" />
                </Button>
              )}
            </div>
          ))}

          <Button.Group floated="left">
            <Button positive type="submit" content="Submit" style={{ marginTop: "10px" }} />
            <Button type="button" content="Cancel" style={{ marginTop: "10px" }} />
          </Button.Group>
        </Form>
      </Segment>
    </>
  );
}

export default PollForm;

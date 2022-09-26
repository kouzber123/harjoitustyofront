import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

//just basic navbar that opens the form to create a poll
function NavBar({ openForm }) {
  return (
    <>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item header>
            <img src="/assets/logo.png" alt="logo" style={{ marginRight: "12px" }} />
          </Menu.Item>
          <Menu.Item name="Active Polls" />
          <Menu.Item>
            <Button onClick={openForm} positive content="Create Poll" />
          </Menu.Item>
        </Container>
      </Menu>
    </>
  );
}

export default NavBar;

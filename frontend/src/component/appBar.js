import React from "react";
import { Grommet, Anchor, Header, Nav, Avatar } from "grommet";

export const AppBar = () => {
  return (
    <Grommet>
      <Header background={"brand"} pad="small">
        <Avatar background="light-2">AZ</Avatar>
        <Nav direction="row">
          <Anchor label="Home" href="#/fakeHomeLink" />
          <Anchor label="Profile" href="#/fakeProfileLink" />
        </Nav>
      </Header>
    </Grommet>
  );
};

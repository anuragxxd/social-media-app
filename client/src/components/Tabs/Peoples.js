import React, { Component } from "react";
import Main from "../Headers/Main";
import PeopleNav from "../Headers/PeopleNav";
import RequestList from "../Peoples/RequestList";

class Peoples extends Component {
  render() {
    return (
      <div>
        <Main></Main>
        <PeopleNav></PeopleNav>
        <RequestList></RequestList>
      </div>
    );
  }
}

export default Peoples;

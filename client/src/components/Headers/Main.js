import React, { Component } from "react";
import { Link } from "react-router-dom";

class Main extends Component {
  render() {
    return (
      <div class="ui top four item fixed menu">
        <Link to="/feed" class="item">
          Feed
        </Link>
        <Link class="item">Messages</Link>
        <Link to="/peoples" class="item">
          Peoples
        </Link>
        <Link to="/profile" class="item">
          Profile
        </Link>
      </div>
    );
  }
}

export default Main;

import React, { Component } from "react";
import PostsList from "./PostsList";
import ProfileNav from "../Headers/ProfileNav";

class Posts extends Component {
  render() {
    return (
      <div>
        <ProfileNav></ProfileNav>
        <br></br>
        <PostsList></PostsList>
      </div>
    );
  }
}

export default Posts;

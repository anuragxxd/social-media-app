import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProfileNav extends Component {
  render() {
    return (
      <div class="ui secondary tiny menu">
        <a class="active item">Posts</a>
        <div class="right menu">
          <Link to="/postCreate" class="item">
            <i class="plus circle icon"></i>
            <p>Add Post</p>
          </Link>
          <Link to="/editProfile" class="item">
            <i class="edit icon"></i>
            <p>Edit Profile</p>
          </Link>
          <Link to="/logout" className="item">
            Logout
          </Link>
        </div>
      </div>
    );
  }
}

export default ProfileNav;

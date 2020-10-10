import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Login from "./Users/Login";
import history from "../history";
import CreateUser from "./Users/CreateUser";
import Feed from "./Tabs/Feed";
import Profile from "./Tabs/Profile";
import PostCreate from "./Posts/PostCreate";
import EditProfile from "./User/EditProfile";
import PostPage from "./Posts/PostPage";
import UserProfile from "./User/UserPages/UserProfile";
import PostLikes from "./Posts/PostLikes";
import Logout from "./Users/Logout";
import Peoples from "./Tabs/Peoples";
import Search from "./Peoples/Search";
import Followers from "./User/Stats/Followers";
import Following from "./User/Stats/Following";
import Messages from "./Tabs/Messages";
import Verify from "./Users/Verify";
import MessageUser from "./Messages/MessageUser.js";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={Feed}></Route>
            <Route exact path="/create" component={CreateUser}></Route>
            <Route exact path="/feed" component={Feed}></Route>
            <Route exact path="/profile" component={Profile}></Route>
            <Route exact path="/logout" component={Logout}></Route>
            <Route exact path="/postCreate" component={PostCreate}></Route>
            <Route exact path="/editProfile" component={EditProfile}></Route>
            <Route exact path="/post/:id" component={PostPage}></Route>
            <Route
              exact
              path="/users/:userName"
              component={UserProfile}
            ></Route>
            <Route exact path="/post/:id/likes" component={PostLikes}></Route>
            <Route exact path="/peoples" component={Peoples}></Route>
            <Route exact path="/search" component={Search}></Route>
            <Route
              exact
              path="/followers/:userName"
              component={Followers}
            ></Route>
            <Route
              exact
              path="/following/:userName"
              component={Following}
            ></Route>
            <Route exact path="/messages" component={Messages}></Route>
            <Route exact path="/verify/:token" component={Verify}></Route>
            <Route
              exact
              path="/message/:userName"
              component={MessageUser}
            ></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

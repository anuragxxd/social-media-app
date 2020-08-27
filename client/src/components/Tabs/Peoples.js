import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../actions";
import Main from "../Headers/Main";
import PeopleNav from "../Headers/PeopleNav";
import RequestList from "../Peoples/RequestList";
import Login from "../Users/Login";
import Loader from "../Loader";

class Peoples extends Component {
  async componentDidMount() {
    if (!this.props.user || this.props.user.length == 0) {
      await this.props.getUser();
    }
  }
  render() {
    if (this.props.user.userName) {
      return (
        <div>
          <Main></Main>
          <PeopleNav></PeopleNav>
          <RequestList></RequestList>
        </div>
      );
    } else if (this.props.user.length == 0) {
      return <Loader></Loader>;
    } else {
      return <Login></Login>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { getUser })(Peoples);

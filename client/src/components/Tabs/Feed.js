import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../actions";
import Main from "../Headers/Main";

class Feed extends Component {
  async componentDidMount() {
    await this.props.getUser();
  }
  render() {
    return (
      <div>
        <Main></Main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { getUser })(Feed);

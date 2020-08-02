import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../actions";
import Main from "../Headers/Main";

class Feed extends Component {
  async componentDidMount() {
    if (!this.props.user || this.props.user.length == 0) {
      await this.props.getUser();
    }
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

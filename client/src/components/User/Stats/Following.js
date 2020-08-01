import React, { Component } from "react";
import { connect } from "react-redux";
import { getFollowing } from "../../../actions";
import Modal from "../../Modal";
import { Link } from "react-router-dom";
import history from "../../../history";

class Following extends Component {
  async componentDidMount() {
    await this.props.getFollowing(this.props.match.params.userName);
  }
  renderUser = (user) => {
    return (
      <Link
        to={`/users/${user.requestedTo}`}
        class="item"
        style={{ color: "black" }}
      >
        <div class="middle aligned content">{user.requestedTo}</div>
      </Link>
    );
  };
  renderContent = () => {
    if (!this.props.following) {
      return <div>Loading</div>;
    }
    if (this.props.following.length == 0) {
      return <div>Nothing To Show</div>;
    }
    return (
      <div class="ui divided items">
        {this.props.following.map((user) => {
          return this.renderUser(user);
        })}
      </div>
    );
  };
  render() {
    return (
      <Modal
        title="Following"
        description={this.renderContent()}
        onDismiss={() => history.goBack()}
      ></Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    following: state.following,
  };
};

export default connect(mapStateToProps, { getFollowing })(Following);

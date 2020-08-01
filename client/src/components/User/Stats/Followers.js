import React, { Component } from "react";
import { connect } from "react-redux";
import { getFollowers } from "../../../actions";
import Modal from "../../Modal";
import { Link } from "react-router-dom";
import history from "../../../history";

class Followers extends Component {
  async componentDidMount() {
    await this.props.getFollowers(this.props.match.params.userName);
  }
  renderUser = (user) => {
    return (
      <Link
        to={`/users/${user.requestedBy}`}
        class="item"
        style={{ color: "black" }}
      >
        <div class="middle aligned content">{user.requestedBy}</div>
      </Link>
    );
  };
  renderContent = () => {
    if (!this.props.followers) {
      return <div>Loading</div>;
    }
    if (this.props.followers.length == 0) {
      return <div>Nothing To Show</div>;
    }
    return (
      <div class="ui divided items">
        {this.props.followers.map((user) => {
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
    followers: state.followers,
  };
};

export default connect(mapStateToProps, { getFollowers })(Followers);

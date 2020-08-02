import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import history from "../../history";
import { Link } from "react-router-dom";

class Logout extends Component {
  renderTitle = () => {
    return (
      <>
        <Link to="/peoples" className="ui button">
          <i class="angle left icon"></i> Back
        </Link>
      </>
    );
  };
  renderUser = (user) => {
    return (
      <Link to={`/users/${user}`} class="item" style={{ color: "black" }}>
        <div class="middle aligned content">{user}</div>
      </Link>
    );
  };

  renderContent = () => {
    return (
      <div class="ui divided items">
        {this.props.users.map((user) => {
          return this.renderUser(user);
        })}
      </div>
    );
  };
  render() {
    return (
      <Modal
        title={this.renderTitle()}
        description={this.renderContent()}
        onDismiss={() => history.push("/peoples")}
      ></Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.querySearchUsers,
  };
};

export default connect(mapStateToProps)(Logout);

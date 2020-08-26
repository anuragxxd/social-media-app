import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions";
import Modal from "../../components/Modal";
import history from "../../history";
import { Link } from "react-router-dom";

class Logout extends Component {
  state = {
    loader: false,
  };
  renderActions = () => {
    return (
      <>
        <button
          onClick={() => {
            this.setState({ loader: true });
            this.props.logoutUser();
          }}
          className={`ui ${
            this.state.loader ? "disabled loading" : ""
          } button negative`}
        >
          Logout
        </button>
        <Link to="/profile" className="ui button">
          Cancel
        </Link>
      </>
    );
  };
  render() {
    return (
      <Modal
        title="Logout"
        description="Are you sure you want to logout?"
        onDismiss={() => history.push("/profile")}
        actions={this.renderActions()}
      ></Modal>
    );
  }
}

export default connect(null, { logoutUser })(Logout);

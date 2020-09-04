import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class MessageList extends Component {
  renderList = () => {
    return this.props.messages.map((message) => {
      return (
        <div>
          <Link to={`/users/${message.by}`} style={{ color: "black" }}>
            {message.by}
          </Link>
          {"  "}
          <div
            class={`ui left pointing large ${
              message.by == this.props.userName ? "basic" : ""
            } label`}
            style={{ fontWeight: "normal" }}
          >
            {message.body}
          </div>
          <br></br>
          <br></br>
        </div>
      );
    });
  };
  render() {
    return <div>{this.renderList()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    userName: state.user.userName,
  };
};

export default connect(mapStateToProps)(MessageList);

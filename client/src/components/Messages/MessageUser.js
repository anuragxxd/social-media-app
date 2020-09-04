import React, { Component } from "react";
import BackTo from "../Headers/BackTo";
import io from "socket.io-client";
import { connect } from "react-redux";
import axios from "axios";
import { getUser } from "../../actions";
import MessageList from "./MessageList";

class MessageUser extends Component {
  state = {
    message: "",
    messages: [],
  };

  async componentDidMount() {
    if (!this.props.user || this.props.user.length == 0) {
      await this.props.getUser();
    }
    this.socket = io();
    this.socket.on("ReceivingObject", (message) => {
      this.setState({ messages: [message, ...this.state.messages] });
    });
    const messages = await axios.get(
      `/api/message/${this.props.match.params.userName}`
    );
    this.setState({ messages: messages.data });
  }

  handleSend = (e) => {
    e.preventDefault();
    if (this.state.message != "") {
      this.socket.emit("SendingMessage", {
        to: this.props.match.params.userName,
        body: this.state.message,
      });
      this.setState({
        messages: [
          {
            by: this.props.user.userName,
            to: this.props.match.params.userName,
            body: this.state.message,
          },
          ...this.state.messages,
        ],
        message: "",
      });
    }
  };

  render() {
    return (
      <div>
        <BackTo to="All messages" toRoute="messages"></BackTo>
        <div className="ui container">
          <h1 class="ui center aligned header" style={{ paddingTop: "55px" }}>
            {this.props.match.params.userName}
          </h1>
          <div
            class="ui segment"
            style={{
              minHeight: "85vh",
              backgroundColor: "#FFFFFF",
            }}
          >
            <form onSubmit={(e) => this.handleSend(e)}>
              <div class="ui action input fluid">
                <input
                  type="text"
                  onChange={(e) => this.setState({ message: e.target.value })}
                />
                <button class="ui button blue">
                  <i class="paper plane icon"></i>Send
                </button>
              </div>
            </form>
            <br></br>
            <MessageList messages={this.state.messages}></MessageList>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { getUser })(MessageUser);

import React, { Component } from "react";
import { connect } from "react-redux";
import { getFollowing } from "../../actions";
import Loader from "../Loader.js";
import { Link } from "react-router-dom";
import { messageListFriends, messageListRequests } from "../../actions";

class MessageUserList extends Component {
  state = {
    list: "f",
  };
  async componentDidMount() {
    await this.props.messageListFriends();
    await this.props.messageListRequests();
  }

  renderList = () => {
    if (this.state.list == "f") {
      if (this.props.messageListFriend.length == 0) {
        return <div>Nothing To Show..</div>;
      }
      return this.props.messageListFriend.map((userName) => {
        return (
          <>
            <Link to={`/message/${userName}`} style={{ color: "black" }}>
              <div class="item">
                <div class="content">
                  <div class="header">{userName}</div>
                </div>
              </div>
            </Link>
            <div class="ui divider"></div>
          </>
        );
      });
    } else if (this.state.list == "r") {
      if (this.props.messageListRequest.length == 0) {
        return <div>Nothing To Show..</div>;
      }
      return this.props.messageListRequest.map((userName) => {
        return (
          <>
            <Link to={`/message/${userName}`} style={{ color: "black" }}>
              <div class="item">
                <div class="content">
                  <div class="header">{userName}</div>
                </div>
              </div>
            </Link>
            <div class="ui divider"></div>
          </>
        );
      });
    }
  };

  render() {
    if (!this.props.messageListFriend) {
      return <Loader></Loader>;
    }
    return (
      <div class="ui container" style={{ paddingTop: "10px" }}>
        <div class="ui top attached two item menu">
          <a class="item" onClick={() => this.setState({ list: "f" })}>
            Friends
          </a>
          <a class="item" onClick={() => this.setState({ list: "r" })}>
            Requests
          </a>
          {/* <div class="item">
            <div
              class="ui transparent icon input"
              style={{ marginRight: "30px", marginLeft: "30px" }}
            >
              <input type="text" placeholder="Search..." />
              <i class="search link icon"></i>
            </div>
          </div> */}
        </div>
        <div class="ui bottom attached segment">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messageListFriend: state.messageListFriends,
    messageListRequest: state.messageListRequests,
  };
};

export default connect(mapStateToProps, {
  messageListFriends,
  messageListRequests,
})(MessageUserList);

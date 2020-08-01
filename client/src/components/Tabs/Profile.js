import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../actions";
import Main from "../Headers/Main";
import history from "../../history";
import Posts from "../Posts/Posts";

class Profile extends Component {
  async componentDidMount() {
    await this.props.getUser();
  }

  toBase64 = (arr) => {
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  render() {
    if (!this.props.user) {
      return <div>Loading</div>;
    } else if (!this.props.user.userName) {
      return <div>Login First</div>;
    }
    return (
      <div>
        <Main></Main>
        <div
          className="ui divided items"
          style={{
            paddingTop: "50px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <div className="item">
            <div className="image">
              <img
                style={{ borderRadius: "10px" }}
                src={`data:image/gif;base64,${this.toBase64(
                  this.props.user.avatar.data
                )}`}
              />
            </div>
            <div className="content">
              <br></br>
              <h4 className="header">
                {this.props.user.name} | {this.props.user.age}
              </h4>
              <div className="description">
                <p>{this.props.user.caption || "Add Caption"}</p>
              </div>
              <div className="extra">
                <div
                  className="ui label"
                  onClick={() =>
                    history.push(`/following/${this.props.user.userName}`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  {this.props.user.following || "0"} Following
                </div>
                <div
                  className="ui label"
                  onClick={() =>
                    history.push(`/followers/${this.props.user.userName}`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  {this.props.user.follower || "0"} Follower
                </div>
                <div className="ui label">
                  {this.props.user.posts || "0"} Posts
                </div>
              </div>
            </div>
          </div>
          <div className="ui divider"></div>
          <Posts></Posts>
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

export default connect(mapStateToProps, {
  getUser,
})(Profile);

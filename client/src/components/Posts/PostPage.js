import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost, likePost, getUser, commentPost } from "../../actions";
import BackTo from "../Headers/BackTo";
import PostPageComments from "./PostPageComments";
import { Link } from "react-router-dom";
import Loader from "../Loader.js";

class PostPage extends Component {
  state = {
    liked: false,
  };

  async componentDidMount() {
    await this.props.getUser();
    await this.props.getPost(this.props.match.params.id);
    await this.props.post.likes.forEach(async (like) => {
      if (like.userName == this.props.user.userName) {
        await this.setState({ liked: true });
      }
    });
  }

  likeClick = async () => {
    if (this.props.user.userName) {
      this.setState({ liked: !this.state.liked });
      await this.props.likePost(this.props.post._id);
    } else {
      alert("Login first!");
    }
  };

  toBase64 = (arr) => {
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  renderBackTo = () => {
    if (this.props.user.userName == this.props.post.owner) {
      return <BackTo to="profile" toRoute="profile"></BackTo>;
    } else if (this.props.user.userName) {
      return <BackTo to="feed" toRoute="feed"></BackTo>;
    } else {
      return <BackTo to="login" toRoute=""></BackTo>;
    }
  };

  render() {
    console.log(this.props.post);
    if (!this.props.post || !this.props.post.image) {
      return <Loader></Loader>;
    }
    return (
      <div>
        {this.renderBackTo()}
        <div className="ui container" style={{ paddingTop: "80px" }}>
          <div class="ui items">
            <div class="item">
              <div
                class="image"
                style={{
                  height: "45%",
                  width: "45%",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={`data:image/gif;base64,${this.toBase64(
                    this.props.post.image.data
                  )}`}
                />
              </div>
              <div class="content" style={{ paddingLeft: "30px" }}>
                <div>
                  <b>{this.props.post.owner}</b>
                </div>
                <div>{this.props.post.description}</div>
                <div class="ui divider"></div>
                <i
                  className={`${
                    this.state.liked
                      ? "heart red icon"
                      : "heart outline red icon"
                  }`}
                  onClick={() => {
                    this.likeClick();
                  }}
                  style={{ cursor: "pointer" }}
                ></i>
                <Link
                  className="ui label"
                  to={`/post/${this.props.post._id}/likes`}
                >
                  {this.props.post.likes.length || "0"} likes
                </Link>
                <div className="ui label">
                  {this.props.post.comment.length || "0"} comments
                </div>
                <div>
                  <PostPageComments
                    comments={this.props.post.comment}
                    id={this.props.post._id}
                    myUserName={this.props.user.userName}
                  ></PostPageComments>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  getPost,
  likePost,
  getUser,
  commentPost,
})(PostPage);

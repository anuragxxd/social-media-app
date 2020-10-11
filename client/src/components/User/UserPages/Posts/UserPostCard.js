import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { likePost, commentPost, getUser } from "../../../../actions";
import { Link } from "react-router-dom";

class PostCard extends Component {
  state = {
    liked: false,
    comment: "",
  };

  async componentDidMount() {
    await this.props.getUser();
    this.props.likes.forEach(async (like) => {
      if (like.userName == this.props.user.userName) {
        await this.setState({ liked: true });
      }
    });
  }

  likeClick = async () => {
    if (this.props.user.userName) {
      this.setState({ liked: !this.state.liked });
      await this.props.likePost(this.props.id);
    } else {
      alert("Login First");
    }
  };

  onComment = async () => {
    if (this.props.user.userName) {
      await this.props.commentPost(this.props.id, { body: this.state.comment });
      this.setState({ comment: "" });
    } else {
      alert("Login First");
    }
  };

  render() {
    return (
      <div className="ui fluid card">
        <div className="content">
          <div className="right floated meta">
            {moment(this.props.createdAt).endOf("min").fromNow()}
          </div>
          <Link to={`/users/${this.props.owner}`} style={{ color: "black" }}>
            {" "}
            {this.props.owner}
          </Link>
        </div>
        <Link to={`/post/${this.props.id}`} className="image">
          <img src={`data:image/gif;base64,${this.props.image}`} />
        </Link>
        <div className="content" style={{ cursor: "pointer" }}>
          <i
            className={`${
              this.state.liked
                ? "heart red icon large"
                : "heart outline red icon large"
            }`}
            onClick={() => {
              this.likeClick();
            }}
          ></i>
          {"    "}
          <form className="ui tiny form" style={{ display: "inline" }}>
            <input
              type="text"
              placeholder="Add Comment..."
              style={{ width: "70%", border: "0" }}
              onChange={(e) => {
                this.setState({ comment: e.target.value });
              }}
              value={this.state.comment}
            />
            <a
              onClick={() => {
                this.onComment();
              }}
            >
              <i className="arrow alternate circle right outline icon large black"></i>
            </a>
          </form>
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

export default connect(mapStateToProps, { likePost, commentPost, getUser })(
  PostCard
);

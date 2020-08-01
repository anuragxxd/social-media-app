import React, { Component } from "react";
import { connect } from "react-redux";
import { commentPost, deleteComment } from "../../actions";
import { Link } from "react-router-dom";

class PostPageComments extends Component {
  state = {
    comment: "",
  };

  renderComment = (userName, body, id) => {
    return (
      <div class="comment">
        <div class="content">
          <Link to={`/users/${userName}`} class="author">
            {userName}
          </Link>
          <div class="metadata">
            <span class="date">Today at 5:42PM</span>
          </div>
          <div class="text">{body}</div>
          {userName == this.props.myUserName ? (
            <div class="actions">
              <a
                class="reply"
                onClick={() => {
                  this.props.deleteComment(this.props.id, id);
                }}
              >
                Delete
              </a>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  onComment = async (e) => {
    e.preventDefault();
    if (this.props.user.userName) {
      await this.props.commentPost(this.props.id, {
        body: this.state.comment,
      });
      this.setState({ comment: "" });
    } else {
      alert("Login first");
      this.setState({ comment: "" });
    }
  };

  render() {
    return (
      <div class="ui minimal comments">
        <br></br>
        <form class="ui form" onSubmit={(e) => this.onComment(e)}>
          <div class="field">
            <textarea
              rows="2"
              style={{ resize: "none" }}
              value={this.state.comment}
              onChange={(e) => this.setState({ comment: e.target.value })}
            ></textarea>
          </div>
          <button
            type="submit"
            class="ui blue labeled submit icon fluid small button"
          >
            <i class="icon edit"></i> Add comment
          </button>
        </form>
        {this.props.comments.map((comment) => {
          return this.renderComment(
            comment.userName,
            comment.body,
            comment._id
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { commentPost, deleteComment })(
  PostPageComments
);

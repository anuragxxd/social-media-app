import React, { Component } from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { getLikes } from "../../actions";
import { Link } from "react-router-dom";

class PostLikes extends Component {
  async componentDidMount() {
    await this.props.getLikes(this.props.match.params.id);
  }

  renderLike = (like) => {
    return (
      <Link
        to={`/users/${like.userName}`}
        class="item"
        style={{ color: "black" }}
      >
        <div class="middle aligned content">{like.userName}</div>
      </Link>
    );
  };

  renderContent = () => {
    if (this.props.likes == null) {
      return <div>Loading..</div>;
    } else {
      return (
        <div class="ui divided items">
          {this.props.likes.map((like) => {
            return this.renderLike(like);
          })}
        </div>
      );
    }
  };
  renderTitle = () => {
    return (
      <>
        <i className="heart icon red"></i>
        Liked By
      </>
    );
  };

  render() {
    return (
      <Modal
        title={this.renderTitle()}
        description={this.renderContent()}
        onDismiss={() => history.push(`/post/${this.props.match.params.id}`)}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    likes: state.likes,
  };
};

export default connect(mapStateToProps, { getLikes })(PostLikes);

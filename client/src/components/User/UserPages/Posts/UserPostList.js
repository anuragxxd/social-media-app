import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostsByUserName } from "../../../../actions";
import UserPostCard from "./UserPostCard";

class UserPostList extends Component {
  async componentDidMount() {
    await this.props.getPostsByUserName(this.props.userName);
  }

  toBase64 = (arr) => {
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  render() {
    if (this.props.posts == null) {
      return <div>Loading..</div>;
    } else if (
      this.props.posts.length != 0 &&
      Array.isArray(this.props.posts)
    ) {
      return (
        <div className="ui four stackable cards" style={{ padding: "20px" }}>
          {this.props.posts.map((post) => {
            return (
              <UserPostCard
                description={post.description}
                id={post._id}
                comments={post.comment}
                likes={post.likes}
                owner={post.owner}
                createdAt={post.createdAt}
                image={this.toBase64(post.image.data)}
              ></UserPostCard>
            );
          })}
        </div>
      );
    } else {
      return <div>Nothing to show.</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

export default connect(mapStateToProps, { getPostsByUserName })(UserPostList);

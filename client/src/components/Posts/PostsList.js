import React, { Component } from "react";
import PostCard from "./PostCard";
import { connect } from "react-redux";
import { myPosts } from "../../actions";

class PostsList extends Component {
  async componentDidMount() {
    await this.props.myPosts();
  }
  toBase64 = (arr) => {
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };
  render() {
    if (this.props.myPost == null) {
      return <div>Loading..</div>;
    } else if (
      this.props.myPost.length != 0 &&
      Array.isArray(this.props.myPost)
    ) {
      return (
        <div className="ui four stackable cards">
          {this.props.myPost.map((post) => {
            return (
              <PostCard
                description={post.description}
                id={post._id}
                comments={post.comment}
                likes={post.likes}
                owner={post.owner}
                createdAt={post.createdAt}
                image={this.toBase64(post.image.data)}
              ></PostCard>
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
    myPost: state.myPosts,
  };
};

export default connect(mapStateToProps, { myPosts })(PostsList);

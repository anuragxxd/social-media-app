import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import { getFeed } from "../../actions";
import PostCard from "../Posts/PostCard";

class FeedPostList extends Component {
  state = {
    page: 1,
    limit: 3,
  };
  async componentDidMount() {
    await this.props.getFeed(this.state.page, this.state.limit);
  }
  fetchPosts = async () => {
    await this.setState({ page: this.state.page + 1 });
    await this.props.getFeed(this.state.page, this.state.limit);
  };

  toBase64 = (arr) => {
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  render() {
    if (!this.props.feed) {
      return <>Loading </>;
    }
    return (
      <div style={{ marginTop: "55px" }} className="ui cards container">
        <InfiniteScroll
          dataLength={this.props.feed.length}
          next={this.fetchPosts}
          hasMore={true}
          loader={<h4>Loading..</h4>}
        >
          {this.props.feed.map((post) => {
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
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    feed: state.feed,
  };
};

export default connect(mapStateToProps, { getFeed })(FeedPostList);

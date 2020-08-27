import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import { getFeed, addFeedPage } from "../../actions";
import PostCard from "../Posts/PostCard";

class FeedPostList extends Component {
  state = {
    limit: 3,
    hasMore: true,
  };
  async componentDidMount() {
    if (this.props.page == 1) {
      await this.props.getFeed(this.props.page, this.state.limit);
    }
    if (this.props.feed.length != this.state.limit * this.props.page) {
      this.setState({ hasMore: false });
    }
  }
  fetchPosts = async () => {
    await this.props.addFeedPage();
    await this.props.getFeed(this.props.page, this.state.limit);
    if (this.props.feed.length != this.state.limit * this.props.page) {
      this.setState({ hasMore: false });
    }
  };

  toBase64 = (arr) => {
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  renderLoader = (text) => {
    return (
      <div class="ui center aligned segment" style={{ height: "50px" }}>
        {text}
      </div>
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
          hasMore={this.state.hasMore}
          loader={this.renderLoader("Loading...")}
          endMessage={this.renderLoader("You have cleared that all...")}
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
    page: state.feedPage,
  };
};

export default connect(mapStateToProps, { getFeed, addFeedPage })(FeedPostList);

import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import user from "./user";
import myPosts from "./myPosts";
import post from "./post";
import otherUser from "./otherUser";
import posts from "./posts";
import likes from "./likes";
import querySearchUsers from "./querySearchUsers";
import requestList from "./requestList";
import followers from "./followers";
import following from "./following";
import feed from "./feed";
import feedPage from "./feedPage";
import messageListFriends from "./messageListFriends";
import messageListRequests from "./messageListRequests";

export default combineReducers({
  form: formReducer,
  user: user,
  myPosts: myPosts,
  post: post,
  otherUser: otherUser,
  posts: posts,
  likes: likes,
  querySearchUsers: querySearchUsers,
  requestList: requestList,
  followers: followers,
  following: following,
  feed: feed,
  feedPage: feedPage,
  messageListFriends: messageListFriends,
  messageListRequests: messageListRequests,
});

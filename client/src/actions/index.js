import {
  loginUser,
  addUser,
  getUser,
  logoutUser,
  editUser,
  editAvatar,
} from "./user";
import { myPosts, getPostsByUserName } from "./posts";
import {
  createPost,
  uploadImage,
  likePost,
  getPost,
  commentPost,
  deleteComment,
  getLikes,
} from "./post";
import { getUserByUsername } from "./otherUser";
import {
  querySearch,
  requestList,
  acceptRequest,
  sendRequest,
  getFollowers,
  getFollowing,
} from "./users";
import { getFeed } from "./feed";

export {
  loginUser,
  addUser,
  getUser,
  createPost,
  myPosts,
  uploadImage,
  logoutUser,
  editUser,
  likePost,
  getPost,
  commentPost,
  deleteComment,
  getUserByUsername,
  getPostsByUserName,
  getLikes,
  querySearch,
  requestList,
  acceptRequest,
  sendRequest,
  getFollowers,
  getFollowing,
  editAvatar,
  getFeed,
};

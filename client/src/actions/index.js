import { loginUser, addUser, getUser, logoutUser, editUser } from "./user";
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
};

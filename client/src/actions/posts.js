import axios from "axios";
import history from "../history";

export const myPosts = () => async (dispatch) => {
  const posts = await axios.get("/api/myPosts");
  dispatch({
    type: "MY_POSTS",
    payload: posts.data,
  });
};

export const getPostsByUserName = (userName) => async (dispatch) => {
  const posts = await axios.get(`/api/posts/${userName}`);
  dispatch({
    type: "POSTS",
    payload: posts.data,
  });
};

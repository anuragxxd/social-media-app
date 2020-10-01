import axios from "axios";
import history from "../history";

const API = 'api';

export const myPosts = () => async (dispatch) => {
  const posts = await axios.get(`/${API}/myPosts`);
  dispatch({
    type: "MY_POSTS",
    payload: posts.data,
  });
};

export const getPostsByUserName = (userName) => async (dispatch) => {
  const posts = await axios.get(`/${API}/posts/${userName}`);
  dispatch({
    type: "POSTS",
    payload: posts.data,
  });
};

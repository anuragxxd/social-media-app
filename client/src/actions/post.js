import axios from "axios";
import history from "../history";

export const createPost = (formValues) => async (dispatch) => {
  const post = await axios.post("/api/post", formValues);
  dispatch({
    type: "CREATE_POST",
    payload: post.data,
  });
};

export const getPost = (id) => async (dispatch) => {
  const post = await axios.get(`/api/post/${id}`);
  dispatch({
    type: "GET_POST",
    payload: post.data,
  });
};

export const uploadImage = (id, formdata) => async (dispatch) => {
  const response = await axios.post(`/api/post/${id}/image`, formdata);
  dispatch({
    type: "UPLOAD_IMAGE",
    payload: response.data,
  });
  history.push("/profile");
};

export const likePost = (id) => async (dispatch) => {
  const response = await axios.post(`/api/post/${id}/like`);
  dispatch({
    type: "LIKE_POST",
    payload: response.data,
  });
};

export const commentPost = (id, comment) => async (dispatch) => {
  const response = await axios.post(`/api/post/${id}/comment`, comment);
  dispatch({
    type: "COMMENT_POST",
    payload: response.data,
  });
};

export const deleteComment = (id, commentId) => async (dispatch) => {
  const response = await axios.delete(`/api/post/${id}/comment/${commentId}`);
  dispatch({
    type: "DELETE_COMMENT",
    payload: response.data,
  });
};

export const getLikes = (id) => async (dispatch) => {
  const response = await axios.get(`/api/post/${id}/likes`);
  dispatch({
    type: "GET_LIKES",
    payload: response.data,
  });
};

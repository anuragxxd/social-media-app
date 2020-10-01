import axios from "axios";
import history from "../history";

const API = 'api';
const API_ROUTE_PATH = 'post';

export const createPost = (formValues) => async (dispatch) => {
  const post = await axios.post(`/${API}/${API_ROUTE_PATH}`, formValues);
  dispatch({
    type: "CREATE_POST",
    payload: post.data,
  });
};

export const getPost = (id) => async (dispatch) => {
  const post = await axios.get(`/${API}/${API_ROUTE_PATH}/${id}`);
  dispatch({
    type: "GET_POST",
    payload: post.data,
  });
};

export const uploadImage = (id, formdata) => async (dispatch) => {
  const response = await axios.post(`/${API}/${API_ROUTE_PATH}/${id}/image`, formdata);
  dispatch({
    type: "UPLOAD_IMAGE",
    payload: response.data,
  });
  history.push("/profile");
};

export const likePost = (id) => async (dispatch) => {
  const response = await axios.post(`/${API}/${API_ROUTE_PATH}/${id}/like`);
  dispatch({
    type: "LIKE_POST",
    payload: response.data,
  });
};

export const commentPost = (id, comment) => async (dispatch) => {
  const response = await axios.post(`/${API}/${API_ROUTE_PATH}/${id}/comment`, comment);
  dispatch({
    type: "COMMENT_POST",
    payload: response.data,
  });
};

export const deleteComment = (id, commentId) => async (dispatch) => {
  const response = await axios.delete(`/${API}/${API_ROUTE_PATH}/${id}/comment/${commentId}`);
  dispatch({
    type: "DELETE_COMMENT",
    payload: response.data,
  });
};

export const getLikes = (id) => async (dispatch) => {
  const response = await axios.get(`/${API}/${API_ROUTE_PATH}/${id}/likes`);
  dispatch({
    type: "GET_LIKES",
    payload: response.data,
  });
};

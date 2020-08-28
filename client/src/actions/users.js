import axios from "axios";
import history from "../history";

export const querySearch = (query) => async (dispatch) => {
  const users = await axios.get(`/api/users/find/${query}`);
  dispatch({
    type: "QUERY_SEARCH",
    payload: users.data,
  });
};

export const requestList = () => async (dispatch) => {
  const users = await axios.get(`/api/req`);
  dispatch({
    type: "REQUEST_LIST",
    payload: users.data,
  });
};

export const acceptRequest = (userName) => async (dispatch) => {
  const users = await axios.post(`/api/req/${userName}`);
  dispatch({
    type: "ACCEPT_REQUEST",
    payload: users.data,
  });
};

export const sendRequest = (userName) => async (dispatch) => {
  await axios.post(`/api/${userName}/sendReq`);
  dispatch({
    type: "SEND_REQUEST",
  });
};

export const getFollowers = (userName) => async (dispatch) => {
  const users = await axios.get(`/api/${userName}/followers`);
  dispatch({
    type: "FOLLOWERS",
    payload: users.data,
  });
};

export const getFollowing = (userName) => async (dispatch) => {
  const users = await axios.get(`/api/${userName}/following`);
  dispatch({
    type: "FOLLOWING",
    payload: users.data,
  });
};

import axios from "axios";

const API = 'api';
const API_ROUTE_PATH = 'messageList';

export const messageListFriends = () => async (dispatch) => {
  const users = await axios.get(`/${API}/${API_ROUTE_PATH}/friends`);
  dispatch({
    type: "MESSAGE_LIST_FRIENDS",
    payload: users.data,
  });
};

export const messageListRequests = () => async (dispatch) => {
  const users = await axios.get(`/${API}/${API_ROUTE_PATH}/requests`);
  dispatch({
    type: "MESSAGE_LIST_REQUESTS",
    payload: users.data,
  });
};

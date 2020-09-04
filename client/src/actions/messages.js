import axios from "axios";

export const messageListFriends = () => async (dispatch) => {
  const users = await axios.get(`/api/messageList/friends`);
  dispatch({
    type: "MESSAGE_LIST_FRIENDS",
    payload: users.data,
  });
};

export const messageListRequests = () => async (dispatch) => {
  const users = await axios.get(`/api/messageList/requests`);
  dispatch({
    type: "MESSAGE_LIST_REQUESTS",
    payload: users.data,
  });
};

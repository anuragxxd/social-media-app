import axios from "axios";

const API = 'api';

export const getUserByUsername = (userName) => async (dispatch) => {
  const user = await axios.get(`/${API}/users/${userName}`);
  dispatch({
    type: "GET_USER_BY_UN",
    payload: user.data,
  });
};

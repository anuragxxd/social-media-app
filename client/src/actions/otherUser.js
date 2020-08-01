import axios from "axios";

export const getUserByUsername = (userName) => async (dispatch) => {
  const user = await axios.get(`/api/users/${userName}`);
  dispatch({
    type: "GET_USER_BY_UN",
    payload: user.data,
  });
};

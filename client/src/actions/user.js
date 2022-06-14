import axios from "axios";
import history from "../history";
const API = 'api';
const API_ROUTE_PATH = 'users';
export const loginUser = (formValues) => async (dispatch) => {
  try {
    const user = await axios.post(`/${API}/${API_ROUTE_PATH}/login`, formValues);
    dispatch({
      type: "LOGIN_USER",
      payload: { ...user.data.user },
    });
    history.push("/feed");
  } catch (e) {
    dispatch({
      type: "ERROR_LOGIN_USER",
      payload: { login_error: e.toString() },
    });
  }
};

export const addUser = (formValues) => async (dispatch) => {
  try {
    await axios.post(`/${API}/${API_ROUTE_PATH}`, formValues);
    dispatch({
      type: "ERROR_CREATE_USER",
      payload: { create_success: "success" },
    });
  } catch (e) {
    dispatch({
      type: "ERROR_CREATE_USER",
      payload: { create_error: e.toString() },
    });
  }
};

export const verifyUser = (token) => async (dispatch) => {
  const user = await axios.post(`/${API}/verify/${token}`);
  dispatch({
    type: "VERIFY_USER",
    payload: user.data,
  });
  history.push("/feed");
};

export const getUser = () => async (dispatch) => {
  const user = await axios.post(`/${API}/${API_ROUTE_PATH}/me`);
  dispatch({
    type: "GET_USER",
    payload: user.data,
  });
};

export const logoutUser = () => async (dispatch) => {
  await axios.post(`/${API}/${API_ROUTE_PATH}/logout`);
  dispatch({
    type: "LOGOUT_USER",
  });
  history.push("/");
};

export const editUser = (formValues) => async (dispatch) => {
  try {
    const user = await axios.patch(`/${API}/${API_ROUTE_PATH}`, formValues);
    dispatch({
      type: "EDIT_USER",
      payload: user.data,
    });
    history.push("/profile");
  } catch (e) {
    dispatch({
      type: "ERROR_EDIT_USER",
      payload: { edit_error: e.toString() },
    });
  }
};

export const editAvatar = (formdata) => async (dispatch) => {
  const user = await axios.post(`/${API}/${API_ROUTE_PATH}/me/avatar`, formdata);
  dispatch({
    type: "EDIT_AVATAR",
    payload: user.data,
  });
  history.push("/profile");
};

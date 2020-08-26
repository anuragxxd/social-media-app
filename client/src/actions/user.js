import axios from "axios";
import history from "../history";

export const loginUser = (formValues) => async (dispatch) => {
  try {
    const user = await axios.post("/api/users/login", formValues);
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
    await axios.post("/api/users", formValues);
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
  const user = await axios.post(`/api/verify/${token}`);
  dispatch({
    type: "VERIFY_USER",
    payload: user.data,
  });
  history.push("/feed");
};

export const getUser = () => async (dispatch) => {
  const user = await axios.post("/api/users/me");
  dispatch({
    type: "GET_USER",
    payload: user.data,
  });
};

export const logoutUser = () => async (dispatch) => {
  await axios.post("/api/users/logout");
  dispatch({
    type: "LOGOUT_USER",
  });
  history.push("/");
};

export const editUser = (formValues) => async (dispatch) => {
  const user = await axios.patch("/api/users", formValues);
  dispatch({
    type: "EDIT_USER",
    payload: user.data,
  });
  history.push("/profile");
};

export const editAvatar = (formdata) => async (dispatch) => {
  const user = await axios.post("/api/users/me/avatar", formdata);
  dispatch({
    type: "EDIT_AVATAR",
    payload: user.data,
  });
  history.push("/profile");
};

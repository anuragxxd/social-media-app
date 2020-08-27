export default (state = [], action) => {
  switch (action.type) {
    case "GET_USER_BY_ID":
      return action.payload;
    case "VERIFY_USER":
      return action.payload;
    case "LOGIN_USER":
      return action.payload;
    case "GET_USER":
      return action.payload;
    case "LOGOUT_USER":
      return [];
    case "EDIT_USER":
      return action.payload;
    case "EDIT_AVATAR":
      return action.payload;
    case "ERROR_LOGIN_USER":
      return action.payload;
    case "ERROR_CREATE_USER":
      return action.payload;
    case "ERROR_EDIT_USER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

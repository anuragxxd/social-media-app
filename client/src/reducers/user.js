export default (state = [], action) => {
  switch (action.type) {
    case "GET_USER_BY_ID":
      return action.payload;
    case "ADD_USER":
      return action.payload;
    case "LOGIN_USER":
      return action.payload;
    case "GET_USER":
      return action.payload;
    case "LOGOUT_USER":
      return [];
    case "EDIT_USER":
      return action.payload;
    default:
      return state;
  }
};

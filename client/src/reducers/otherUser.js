export default (state = null, action) => {
  switch (action.type) {
    case "GET_USER_BY_UN":
      return action.payload;
    default:
      return state;
  }
};

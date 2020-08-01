export default (state = null, action) => {
  switch (action.type) {
    case "CREATE_POST":
      return action.payload;
    case "LIKE_POST":
      return action.payload;
    case "GET_POST":
      return action.payload;
    case "COMMENT_POST":
      return action.payload;
    case "DELETE_COMMENT":
      return action.payload;
    default:
      return state;
  }
};

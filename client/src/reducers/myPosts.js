export default (state = null, action) => {
  switch (action.type) {
    case "MY_POSTS":
      return action.payload;
    default:
      return state;
  }
};

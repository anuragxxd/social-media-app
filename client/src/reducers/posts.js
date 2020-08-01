export default (state = null, action) => {
  switch (action.type) {
    case "POSTS":
      return action.payload;
    default:
      return state;
  }
};

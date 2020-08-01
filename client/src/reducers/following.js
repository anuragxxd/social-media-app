export default (state = null, action) => {
  switch (action.type) {
    case "FOLLOWING":
      return action.payload;
    default:
      return state;
  }
};

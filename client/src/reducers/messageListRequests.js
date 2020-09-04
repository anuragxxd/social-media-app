export default (state = null, action) => {
  switch (action.type) {
    case "MESSAGE_LIST_REQUESTS":
      return action.payload;
    default:
      return state;
  }
};

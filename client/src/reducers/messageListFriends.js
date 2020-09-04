export default (state = null, action) => {
  switch (action.type) {
    case "MESSAGE_LIST_FRIENDS":
      return action.payload;
    default:
      return state;
  }
};

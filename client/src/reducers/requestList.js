export default (state = null, action) => {
  switch (action.type) {
    case "REQUEST_LIST":
      return action.payload;
    case "ACCEPT_REQUEST":
      return action.payload;
    default:
      return state;
  }
};

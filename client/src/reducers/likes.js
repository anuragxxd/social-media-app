export default (state = null, action) => {
  switch (action.type) {
    case "GET_LIKES":
      return action.payload;
    default:
      return state;
  }
};

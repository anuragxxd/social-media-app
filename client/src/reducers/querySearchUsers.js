export default (state = null, action) => {
  switch (action.type) {
    case "QUERY_SEARCH":
      return action.payload;
    default:
      return state;
  }
};

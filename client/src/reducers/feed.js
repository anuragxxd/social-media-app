export default (state = [], action) => {
  switch (action.type) {
    case "FEED":
      return state.concat(action.payload);
    default:
      return state;
  }
};

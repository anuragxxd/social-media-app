export default (state = 1, action) => {
  switch (action.type) {
    case "ADD_FEEDPAGE":
      return state + 1;
    default:
      return state;
  }
};

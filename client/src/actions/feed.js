import axios from "axios";
import history from "../history";

export const getFeed = (page, limit) => async (dispatch) => {
  const posts = await axios.get(`/api/feed?page=${page}&limit=${limit}`);
  dispatch({
    type: "FEED",
    payload: posts.data,
  });
};

export const addFeedPage = () => async (dispatch) => {
  dispatch({
    type: "ADD_FEEDPAGE",
  });
};

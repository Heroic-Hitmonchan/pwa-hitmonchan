import axios from "axios";

const FETCH_HISTORY = "FETCH_HISTORY";

export const fetchHistory = (history) => {
  return {
    type: FETCH_HISTORY,
    history,
  };
};

export const _fetchHistoryThunk = () => {
  console.log("Hello!")
  return async (dispatch) => {
    try {
      const { data: history } = await axios.get("/api/songs/");
      console.log(history)
      dispatch(fetchHistory(history))
    } catch (error) {
      console.error(error);
    }
  };
};

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_HISTORY:
            return action.history
        default:
            return state
    }
}


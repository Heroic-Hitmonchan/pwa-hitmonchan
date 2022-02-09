import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { _fetchHistoryThunk } from "../../store/list";

const History = () => {
  const history = useSelector((state) => {
    console.log(state);
    return state.history;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_fetchHistoryThunk());
  }, []);
  return (
    <>
      <h1>Hello from History Page</h1>
      <button onClick={() => dispatch(_fetchHistoryThunk)}>Run</button>
    </>
  );
};

export default History;

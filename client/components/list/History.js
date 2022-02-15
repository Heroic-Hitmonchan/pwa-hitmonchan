import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { _fetchHistoryThunk } from "../../store/list";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import "./history.css";

const History = () => {
  const history = useSelector((state) => {
    console.log(state.list);
    console.log(state);
    return state.list;
  });
  const homePage = useHistory();
  console.log(history);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_fetchHistoryThunk());
  }, []);

  return (
    <motion.div
      className="history-list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 1 }}
    >
      <img
        src="/logo.png"
        onClick={() => homePage.push("/home")}
        className="history-return-logo"
      />
      <table>
        <tbody>
          <tr>
            <td>Images</td>
            <td>Songs</td>
            <td>Artists</td>
          </tr>

          <>
            {history.map((data, idx) => (
              <tr key={idx}>
                <td>
                  <img className="history-img" src={data.image.awsUrl} />
                </td>
                <td>{data.trackName}</td>
                <td>{data.artistName.map((artist) => artist).join(" & ")}</td>
              </tr>
            ))}
          </>
        </tbody>
      </table>
    </motion.div>
  );
};

export default History;

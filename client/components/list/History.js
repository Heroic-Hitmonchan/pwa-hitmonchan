import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { _fetchHistoryThunk } from "../../store/list";

const History = () => {
  const history = useSelector((state) => {
    console.log(state.list);
    console.log(state);
    return state.list;
  });
  console.log(history);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_fetchHistoryThunk());
  }, []);

  return (
    <div className="history-list">
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
                  <img src={data.image.awsUrl} />
                </td>
                <td>{data.trackName}</td>
                <td>{data.artistName.map((artist) => artist).join(" & ")}</td>
              </tr>
            ))}
          </>
        </tbody>
      </table>
    </div>
  );
};

export default History;

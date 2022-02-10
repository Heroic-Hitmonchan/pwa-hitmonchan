import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { _fetchHistoryThunk } from "../../store/list";

const History = () => {
  const history =
    useSelector((state) => {
      console.log(state.list)
      console.log(state)
      return state.history;
    }) || [];
  console.log(history);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_fetchHistoryThunk());
  }, []);

  // if(history.length === 0) {
  //   return (
  //     <div className="empty-history">
  //       <h1>You have no History!</h1>
  //     </div>
  //   )
  // } else {
  return (
    <div className="history-list">
      <table>
        <tbody>
          <tr>
          <td>Images</td>
          <td>Songs</td>
          <td>Artists</td>
        </tr>

        {history.map((data, idx) => (
            <tr key={idx}>
              <td>
                <img src={data.image.awsUrl} />
              </td>
              <td>{data.trackName}</td>
              <td>{data.artistName.map((artist) => artist).join(" & ")}</td>
            </tr>
        ))}
        </tbody>
        
      </table>
    </div>
  );
};
// return (
//   <>
//     <h1>Hello from History Page</h1>

//   </>
// );

export default History;

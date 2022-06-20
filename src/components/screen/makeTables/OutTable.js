import React from "react";
import moment from "moment";

function OutTable({ data }) {
  const outTable = data.map((el, index) => {
    return (
      <tr key={index}>
        <td className="text-info text-center">{el.stayout_id}</td>
        <td className="text-info text-center">{el.std_id}</td>
        <td className="text-info text-center">{el.StdInfo.std_name}</td>
        <td className="text-info text-center">
          {moment(el.start_date).format("YYYY-MM-DD")}
        </td>
        <td className="text-info text-center">
          {moment(el.end_date).format("YYYY-MM-DD")}
        </td>
      </tr>
    );
  });
  return <>{outTable}</>;
}
export default OutTable;

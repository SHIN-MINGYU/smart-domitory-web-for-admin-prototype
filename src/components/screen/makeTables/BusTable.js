import React from "react";
function BusTable({ data }) {
  const renderItem = data.map((el, index) => {
    return (
      <tr key={index}>
        <td className="text-info text-center">{el.bus_req_id}</td>
        <td className="text-info text-center">{el.std_id}</td>
        <td className="text-info text-center">{el.StdInfo.std_name}</td>
        <td className="text-info text-center">{el.bus_stop}</td>
        <td className="text-info text-center">{el.bus_time}</td>
      </tr>
    );
  });
  return <>{renderItem}</>;
}
export default BusTable;

import React from "react";
import moment from "moment";

function BusAtBok({ data }) {
  const renderItem = data.map((el, index) => (
    <tr key={index}>
      <td className="text-center">
        {moment(el.bus_date).format("YYYY-MM-DD")}
      </td>
      <td className="text-center">{el.bus_time}</td>
      <td className="text-center">{el.people_count}</td>
    </tr>
  ));
  return <>{renderItem}</>;
}

export default BusAtBok;

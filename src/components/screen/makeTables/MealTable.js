import React from "react";
import moment from "moment";
function MealTable({ data }) {
  const renderItem = data.map((el, index) => {
    return (
      <tr
        key={index}
        /*   onClick={() => {
          axios
            .delete("http://localhost:3001/admin/menu", {
              data: { date: el.date },
            })
            .then((res) => console.log(el.date));
        }} */
      >
        <td className="text-info text-center">
          {moment(el.date).format("YYYY-MM-DD")}
        </td>
        <td className="text-info text-center">
          {el.breakfast.replaceAll(" ", ",")}
        </td>
        <td className="text-info text-center">
          {el.lunch.replaceAll(" ", ",")}
        </td>
        <td className="text-info text-center">
          {el.dinner.replaceAll(" ", ",")}
        </td>
      </tr>
    );
  });
  return <>{renderItem}</>;
}
export default MealTable;

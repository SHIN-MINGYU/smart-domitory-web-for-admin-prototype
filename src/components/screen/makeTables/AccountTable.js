import axios from "axios";
import React from "react";

function AccountTable({ data, onLoadData }) {
  const onClick = (std_id) => {
    axios
      .patch(process.env.REACT_APP_API_URL + "/admin/agree", { std_id })
      .then((res) => onLoadData())
      .catch((err) => console.log(err));
  };
  const renderItem = data.map((el, index) => {
    return (
      <tr key={index}>
        <th className="text-info text-center">{el.std_id}</th>
        <th className="text-info text-center">{el.std_name}</th>
        <th className="text-info text-center">{el.ph_num}</th>
        <th className="text-info text-center">{el.room_num}</th>
        <th className="text-info text-center">{el.e_mail}</th>
        <th className="text-info text-center">
          <input onClick={() => onClick(el.std_id)} type="checkbox"></input>
        </th>
      </tr>
    );
  });
  console.log(renderItem);
  return renderItem;
}
export default AccountTable;

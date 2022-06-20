import React, { useCallback } from "react";
import moment from "moment";
import axios from "axios";

function AsTable({ data, setContent, loadAsData, nowPage }) {
  const onCheck = useCallback((id) => {
    axios
      .patch(process.env.REACT_APP_API_URL + "/admin/as/checked", { id })
      .then((res) => loadAsData(nowPage))
      .catch((err) => console.log(err));
  }, []);
  const tables = data.map((el, index) => {
    return (
      <tr key={index} onClick={() => setContent(el.content)}>
        <th className="text-info">{el.as_id}</th>
        <th className="text-info">{el.std_id}</th>
        <th className="text-info">{el.StdInfo.std_name}</th>
        <th className="text-info">{el.StdInfo.room_num}</th>
        <th
          className="text-info"
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}>
          {el.title}
        </th>
        <th className="text-info">{el.StdInfo.ph_num}</th>
        <th className="text-info">
          {moment(el.request_date).format("YYYY년MM월DD일")}
        </th>
        <th className="text-info">{el.vst_check ? "동의" : "거부"}</th>
        <th className="text-info">
          <input
            onChange={(e) => {
              e.target.checked = true;
              onCheck(el.as_id);
              e.target.checked = false;
            }}
            type="checkbox"></input>
        </th>
      </tr>
    );
  });
  return tables;
}
export default AsTable;

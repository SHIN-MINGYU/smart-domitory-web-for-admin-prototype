import moment from "moment";
function HlthTable({ data }) {
  const renderItem = data.map((el) => (
    <tr key={el.hlth_id}>
      <td className="text-info text-center">{el.hlth_id}</td>
      <td className="text-info text-center">{el.std_id}</td>
      <td className="text-info text-center">{el.StdInfo.std_name}</td>
      <td className="text-info text-center">
        {moment(el.date).format("YYYY-MM-DD")}
      </td>
      <td className="text-info text-center">
        {el.start_time.slice(0, 2) + "시"}~{el.end_time.slice(0, 2) + "시"}
      </td>
    </tr>
  ));
  return <>{renderItem}</>;
}
export default HlthTable;

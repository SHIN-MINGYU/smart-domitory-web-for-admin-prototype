import React, { useState } from "react";
import axios from "axios";
import "../../css/tableStyle.css";
import BusInfoTable from "../makeTables/BusInfoTable";
function BusInfoManagePage() {
  const [data, setData] = useState();
  const [bus_date, setBus_date] = useState(0);
  const [type, setType] = useState(0);
  const [update, setUpdate] = useState(0);
  React.useEffect(() => {
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/businfo", {
        bus_date,
        type,
      })
      .then((res) => setData(res.data));
  }, [bus_date, type, update]);
  return (
    <>
      <div className="container">
        <div className="border-bottom align-self-center">
          <p
            className="p-4 font-weight-bold text-primary"
            style={{ marginBottom: 0 }}>
            버스 시간표 관리
          </p>
        </div>
        <div className="row mt-3">
          <div className="col-md-12 text-center text-primary font-weight-bold ">
            <p className="mb-0" onClick={() => setType(type === 0 ? 1 : 0)}>
              {type === 0
                ? "복현캠퍼스 ➜ 글로벌캠퍼스"
                : "글로벌캠퍼스 ➜ 복현캠퍼스"}
            </p>
            <p
              className="mb-0"
              onClick={() => setBus_date(bus_date === 0 ? 1 : 0)}>
              {bus_date === 0 ? "평일" : "주말"}
            </p>
            <p
              className="mb-0 text-danger font-weight-normal"
              style={{ fontSize: "x-small" }}>
              해당 글자를 클릭하면 유형이 바뀝니다
            </p>
          </div>
        </div>
        <div className="container no-gutters mt-3">
          <div className="row flex-row">
            <div className="col-md-12">
              <table className="table table-bordered rounded-top">
                <colgroup>
                  <col></col>
                  <col></col>
                  <col></col>
                  <col></col>
                  <col></col>
                  <col></col>
                  <col></col>
                  <col></col>
                  <col></col>
                  <col></col>
                  <col></col>
                  <col></col>
                  <col></col>
                  <col></col>
                </colgroup>
                <thead>
                  <tr>
                    <th className="text-info">복현캠퍼스</th>
                    <th className="text-info">우방</th>
                    <th className="text-info">시티병원</th>
                    <th className="text-info">유성APT</th>
                    <th className="text-info">SK빌딩</th>
                    <th className="text-info">동천119안전센터</th>
                    <th className="text-info">칠곡 운암역</th>
                    <th className="text-info">북구문화예술회관</th>
                    <th className="text-info">기업은행칠곡점</th>
                    <th className="text-info">태전역</th>
                    <th className="text-info">글로벌캠퍼스</th>
                    <th className="text-info">글로벌생활관</th>
                    <th className="text-info">영어마을</th>
                    <th className="text-info">문양역</th>
                  </tr>
                </thead>
                <tbody>
                  <BusInfoTable
                    data={data}
                    setUpdate={setUpdate}
                    update={update}></BusInfoTable>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BusInfoManagePage;

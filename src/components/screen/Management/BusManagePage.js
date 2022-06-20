import React, { useState } from "react";
import axios from "axios";
import "../../css/tableStyle.css";
import BusTable from "../makeTables/BusTable";
import BusAtGlobal from "../makeInfoScreen/BusAtGlobal";
import BusAtBok from "../makeInfoScreen/BusAtBok";
import NavBar from "../makeNavBar/NavBar";

function BusManagePage() {
  const [date, setDate] = useState("");
  const [stdId, setStdId] = useState("");
  const [stdName, setStdName] = useState("");
  const [busStop, setBusStop] = useState("");
  const [data, setData] = useState([]);
  const [globalStart, setGlobalStart] = useState([]);
  const [bokStart, setBokStart] = useState([]);
  const [nowPage, setNowPage] = useState(1);
  const [pageNum, setPageNum] = useState(1);

  React.useEffect(() => {
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/bus", {
        date,
        stdId,
        stdName,
        busStop,
        nowPage,
      })
      .then((res) => setData(res.data));
  }, [nowPage]);

  React.useEffect(() => {
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/bus/inquire", { type: 0 })
      .then((res) => setGlobalStart(res.data));
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/bus/inquire", { type: 1 })
      .then((res) => setBokStart(res.data));
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/bus/pagenum")
      .then((res) =>
        setPageNum(
          res.data.count % 10
            ? parseInt(res.data.count / 10) + 1
            : res.data.count / 10
        )
      );
  }, []);

  const onSearchData = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/bus", {
        date,
        stdId,
        stdName,
        busStop,
        nowPage,
      })
      .then((res) => setData(res.data));
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/bus/pagenum", {
        date,
        stdId,
        stdName,
        busStop,
      })
      .then((res) =>
        setPageNum(
          res.data.count % 10
            ? parseInt(res.data.count / 10) + 1
            : res.data.count / 10
        )
      );
    setNowPage(1);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearchData();
    }
  };

  return (
    <>
      <div className="container">
        <div className="border-bottom align-self-center">
          <p
            className="p-4 font-weight-bold text-primary"
            style={{ marginBottom: 0 }}>
            버스 신청자 관리
          </p>
        </div>
        <div className="row">
          <div className="mr-5" style={{ textAlign: "center" }}>
            <div className="col-md-12 mt-3  flex-row">
              <div className="col-md-6 d-inline ">
                <span className="text-primary">날짜 : </span>
                <input
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  style={{ width: "220px" }}
                  type="date"></input>
              </div>
            </div>
            <div className="col-md-12 ml-3 mt-3">
              <div className="col-md-3 d-inline">
                <p className="text-primary d-inline mr-2">학번</p>
                <input
                  value={stdId}
                  onChange={(e) => setStdId(e.target.value)}
                  onKeyUp={onKeyPress}></input>
              </div>
              <div className="col-md-3 d-inline">
                <p className="text-primary d-inline mr-2">이름</p>
                <input
                  value={stdName}
                  onChange={(e) => setStdName(e.target.value)}
                  onKeyUp={onKeyPress}></input>
              </div>
              <div className="col-md-3 d-inline">
                <p className="text-primary d-inline mr-2">정류장</p>
                <input
                  onChange={(e) => {
                    setBusStop(e.target.value);
                  }}
                  value={busStop}
                  onKeyUp={onKeyPress}></input>
              </div>
              <div className="col-md-3 d-inline">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    onSearchData();
                  }}>
                  조회
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container no-gutters mt-3">
          <div className="row flex-row">
            <div className="col-md-9">
              <table className="table rounded-top">
                <colgroup>
                  <col width={"20%"}></col>
                  <col width={"20%"}></col>
                  <col width={"20%"}></col>
                  <col width={"20%"}></col>
                  <col width={"20%"}></col>
                </colgroup>
                <thead>
                  <tr>
                    <th className="text-info text-center">번호</th>
                    <th className="text-info text-center">학번</th>
                    <th className="text-info text-center">이름</th>
                    <th className="text-info text-center">출발지</th>
                    <th className="text-info text-center">시간</th>
                  </tr>
                </thead>
                <tbody>
                  <BusTable data={data ? data : []}></BusTable>
                </tbody>
              </table>
              <NavBar
                setNowPage={setNowPage}
                nowPage={nowPage}
                page={"out"}
                pageNum={pageNum ? pageNum : 0}></NavBar>
            </div>
            <div
              className="col-md-3 flex-column d-flex justify-content-between"
              style={{ height: "70vh" }}>
              <div
                className="border border-primary rounded-top"
                style={{ height: "33vh" }}>
                <div className="col-md-10 p-2 text-primary text-center font-weight-bold mx-auto">
                  글로벌 생활관 출발
                </div>
                <div className="mt-1 d-flex justify-content-center">
                  <table className="table">
                    <colgroup>
                      <col width="50%"></col>
                      <col width="25%"></col>
                      <col width="25%"></col>
                    </colgroup>
                    <thead>
                      <tr>
                        <td className="text-center">날짜</td>
                        <td className="text-center">시간</td>
                        <td className="text-center">인원</td>
                      </tr>
                    </thead>
                    <tbody>
                      <BusAtGlobal data={globalStart}></BusAtGlobal>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                className="border border-primary rounded-top"
                style={{ height: "33vh" }}>
                <div className="col-md-10 p-2 text-primary text-center font-weight-bold mx-auto">
                  복현 캠퍼스 출발
                </div>
                <div className="mt-1  justify-content-center no-gutters">
                  <table className="table">
                    <colgroup>
                      <col width="50%"></col>
                      <col width="25%"></col>
                      <col width="25%"></col>
                    </colgroup>
                    <thead>
                      <tr>
                        <td className="text-center">날짜</td>
                        <td className="text-center">시간</td>
                        <td className="text-center">인원</td>
                      </tr>
                    </thead>
                    <tbody>
                      <BusAtBok data={bokStart}></BusAtBok>
                    </tbody>
                  </table>
                  {/* <div className="d-flex justify-content-around">
                    <span className="text-primary">날짜</span>
                    <span className="text-primary">시간</span>
                    <span className="text-primary">인원수</span>
                  </div>
                  <div className="d-flex justify-content-around">
                    <span>2022-05-16</span>
                    <span>09:40</span>
                    <span>21</span>
                  </div> */}
                </div>
              </div>
              {/*               <div className="col-md-12 p-2"></div>
              <div className="mt-4"></div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BusManagePage;

import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import AsTable from "../makeTables/AsTable";
import "../../css/tableStyle.css";
import NavBar from "../makeNavBar/NavBar";

function AsManagePage() {
  const [AsData, setAsData] = useState("");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stdId, setStdId] = useState("");
  const [stdName, setStdName] = useState("");
  const [nowPage, setNowPage] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const loadAsData = useCallback(
    (nowPage) => {
      axios
        .post(process.env.REACT_APP_API_URL + "/admin/as", { nowPage: nowPage })
        .then((res) => setAsData(res.data))
        .catch((err) => console.log(err));
    },
    [nowPage]
  );
  const searchAsData = useCallback(() => {
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/as", {
        start_date: startDate,
        end_date: endDate,
        std_id: stdId,
        std_name: stdName,
      })
      .then((res) => setAsData(res.data))
      .catch((err) => console.log(err));
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/as/pagenum", {
        start_date: startDate,
        end_date: endDate,
        std_id: stdId,
        std_name: stdName,
      })
      .then((res) =>
        setPageNum(
          res.data.count % 10
            ? parseInt(res.data.count / 10) + 1
            : res.data.count / 10
        )
      );
  }, [startDate, endDate, stdId, stdName]);
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      searchAsData();
      setNowPage(1);
    }
  };
  useEffect(() => {
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/as", {
        start_date: startDate,
        end_date: endDate,
        std_id: stdId,
        std_name: stdName,
        nowPage,
      })
      .then((res) => setAsData(res.data))
      .catch((err) => console.log(err));
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/as/pagenum", {
        start_date: startDate,
        end_date: endDate,
        std_id: stdId,
        std_name: stdName,
      })
      .then((res) =>
        setPageNum(
          res.data.count % 10
            ? parseInt(res.data.count / 10) + 1
            : res.data.count / 10
        )
      );
  }, [nowPage]);
  return (
    <>
      <div className="container">
        <div className="border-bottom align-self-center">
          <p
            className="p-4 font-weight-bold text-primary"
            style={{ marginBottom: 0 }}>
            A/S 신청자 관리
          </p>
        </div>
        <div className="row">
          <div className="mr-5" style={{ textAlign: "center" }}>
            <div className="col-md-12 mt-3  flex-row">
              <div className="col-md-6 d-inline ">
                <span className="text-primary">시작 날짜 : </span>
                <input
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                  style={{ width: "220px" }}
                  type="date"></input>
              </div>
              <div className="col-md-6 d-inline">
                <span className="text-primary">종료 날짜 : </span>{" "}
                <input
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
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
                <p className="text-primary d-inline mr-2">상태</p>
                <input onKeyUp={onKeyPress}></input>
              </div>
              <div className="col-md-3 d-inline">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    searchAsData();
                    setNowPage(1);
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
                  <col width={"8%"}></col>
                  <col width={"8%"}></col>
                  <col width={"12%"}></col>
                  <col width={"8%"}></col>
                  <col width={"20%"}></col>
                  <col width={"15%"}></col>
                  <col width={"15%"}></col>
                  <col width={"8%"}></col>
                  <col width={"8%"}></col>
                </colgroup>
                <thead>
                  <tr>
                    <th className="text-info">번호</th>
                    <th className="text-info">학번</th>
                    <th className="text-info">이름</th>
                    <th className="text-info">호실</th>
                    <th className="text-info">제목</th>
                    <th className="text-info">전화번호</th>
                    <th className="text-info">신청날짜</th>
                    <th className="text-info">방문동의</th>
                    <th className="text-info">확인</th>
                  </tr>
                </thead>
                <tbody>
                  {AsData ? (
                    <AsTable
                      nowPage={nowPage}
                      data={AsData}
                      loadAsData={loadAsData}
                      setContent={setContent}></AsTable>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
              <NavBar
                setNowPage={setNowPage}
                nowPage={nowPage}
                page={"out"}
                pageNum={pageNum ? pageNum : 0}></NavBar>
            </div>
            <div
              className="col-md-3 flex-column border border-primary rounded-top"
              style={{ height: "70vh" }}>
              <div className="col-md-12 p-3 border-bottom">내용</div>
              <div className="mt-4">{content}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AsManagePage;

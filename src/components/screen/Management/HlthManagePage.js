import axios from "axios";
import React, { useCallback, useState } from "react";
import HlthTable from "../makeTables/HlthTable";
import NavBar from "../makeNavBar/NavBar";

function HlthManagePage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stdId, setStdId] = useState("");
  const [stdName, setStdName] = useState("");
  const [data, setData] = useState();
  const [nowPage, setNowPage] = useState(1);
  const [pageNum, setPageNum] = useState(1);

  const loadData = useCallback(() => {
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/hlth", {
        startDate,
        endDate,
        stdId,
        stdName,
        nowPage,
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/hlth/pagenum", {
        startDate,
        endDate,
        stdId,
        stdName,
        nowPage,
      })
      .then((res) =>
        setPageNum(
          res.data.count % 10
            ? parseInt(res.data.count / 10) + 1
            : res.data.count / 10
        )
      )
      .catch((err) => console.log(err));
  }, [nowPage, startDate, endDate, stdId, stdName]);

  React.useEffect(() => {
    loadData();
  }, [nowPage]);
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      loadData();
      setNowPage(1);
    }
  };
  return (
    <>
      <div className="container">
        <div className="border-bottom align-self-center">
          <p
            className="p-4 font-weight-bold text-primary"
            style={{ marginBottom: 0 }}>
            헬스 신청 조회
          </p>
        </div>
        <div className="row col-md-12 justify-content-center">
          <div className="mr-5" style={{ textAlign: "center" }}>
            <div className="col-md-12 mt-3 flex-row">
              <div className="col-md-6 d-inline">
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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    loadData();
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
            <div className="col-md-12">
              <table className="table rounded-top">
                <colgroup>
                  <col width={"10%"}></col>
                  <col width={"10%"}></col>
                  <col width={"10%"}></col>
                  <col width={"35%"}></col>
                  <col width={"35%"}></col>
                </colgroup>
                <thead>
                  <tr>
                    <th className="text-info text-center">번호</th>
                    <th className="text-info text-center">학번</th>
                    <th className="text-info text-center">이름</th>
                    <th className="text-info text-center">날짜</th>
                    <th className="text-info text-center">시간</th>
                  </tr>
                </thead>
                <tbody>
                  <HlthTable data={data ? data : []}></HlthTable>
                </tbody>
              </table>
              <NavBar
                setNowPage={setNowPage}
                nowPage={nowPage}
                pageNum={pageNum ? pageNum : 1}></NavBar>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HlthManagePage;

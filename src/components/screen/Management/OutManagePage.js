import axios from "axios";
import React, { useState } from "react";
import OutTable from "../makeTables/OutTable";
import DatePerPeople from "../makeInfoScreen/DatePerPeople";
import "../../css/ManagementPage.css";
import NavBar from "../makeNavBar/NavBar";

function OutManagePage() {
  const [date, setDate] = useState("");
  const [stdId, setStdId] = useState("");
  const [stdName, setStdName] = useState("");
  const [data, setData] = useState();
  const [peopleArr, setPeopleArr] = useState([]);
  const [pageNum, setPageNum] = useState();
  const [nowPage, setNowPage] = useState(1);
  React.useEffect(() => {
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/stayout/people/date", {
        date: new Date(),
      })
      .then((res) => setPeopleArr(res.data));
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/stayout/pagenum")
      .then((res) =>
        setPageNum(
          res.data.count % 10
            ? parseInt(res.data.count / 10) + 1
            : res.data.count / 10
        )
      );
  }, []);
  React.useEffect(() => {
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/stayout", {
        std_id: stdId,
        std_name: stdName,
        nowPage,
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [nowPage]);

  const searchData = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/stayout", {
        std_id: stdId,
        std_name: stdName,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/stayout/pagenum", {
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
    setNowPage(1);
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      searchData();
    }
  };
  return (
    <>
      <div className="container">
        <div className="border-bottom align-self-center">
          <p
            className="p-4 font-weight-bold text-primary"
            style={{ marginBottom: 0 }}>
            외박 신청 조회
          </p>
        </div>
        <div className="row col-md-12 justify-content-center">
          <div className="mr-5" style={{ textAlign: "center" }}>
            {/*  <div className="col-md-12 mt-3 flex-row">
              <div className="col-md-12 d-inline">
                <span className="text-primary">시작 날짜 : </span>
                <input
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  style={{ width: "220px" }}
                  type="date"></input>
              </div>
            </div> */}
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
                  onClick={searchData}>
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
                    <th className="text-info text-center">시작 날짜</th>
                    <th className="text-info text-center">종료 날짜</th>
                  </tr>
                </thead>
                <tbody>
                  <OutTable data={data ? data : []}></OutTable>
                </tbody>
              </table>
              <NavBar
                setNowPage={setNowPage}
                nowPage={nowPage}
                page={"out"}
                pageNum={pageNum ? pageNum : 0}></NavBar>
            </div>
            <div
              className="col-md-3 flex-column border border-primary rounded-top scrollBar"
              style={{
                height: "70vh",
                overflow: "scroll",
                overflowX: "hidden",
              }}>
              <div className=" col-md-12 p-3 border-bottom flex-row d-flex justify-content-around">
                <p className="mb-0 d-inline"> 날짜</p>
                <p className="mb-0 d-inline"> 인원수</p>
              </div>
              <div className="mt-4 col-md-12">
                <DatePerPeople data={peopleArr}></DatePerPeople>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default OutManagePage;

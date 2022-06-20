import axios from "axios";
import React, { useState } from "react";
import { UncontrolledCollapse } from "reactstrap";
import MealTable from "../makeTables/MealTable";
import NavBar from "../makeNavBar/NavBar";

function MealManagePage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [data, setData] = useState("");
  const [update, setUpdate] = useState(0);
  const [nowPage, setNowPage] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const submitMeal = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/menu/exist", {
        date: selectedDate,
      })
      .then((res) => {
        if (!res.data) {
          axios
            .post(process.env.REACT_APP_API_URL + "/admin/menu/create", {
              date: selectedDate,
              breakfast,
              lunch,
              dinner,
            })
            .then((res) => {
              setUpdate(update + 1);
            })
            .catch((err) => console.log(err));
        } else {
          axios
            .patch(process.env.REACT_APP_API_URL + "/admin/menu", {
              date: selectedDate,
              breakfast,
              lunch,
              dinner,
            })
            .then((res) => {
              setUpdate(update + 1);
            })
            .catch((err) => console.log(err));
        }
      });
    setBreakfast("");
    setLunch("");
    setDinner("");
    setSelectedDate("");
  };

  React.useEffect(() => {
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/menu", {
        startDate,
        endDate,
        nowPage,
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/menu/pagenum", {
        startDate,
        endDate,
      })
      .then((res) => {
        setPageNum(
          res.data.count % 10
            ? parseInt(res.data.count / 10) + 1
            : res.data.count / 10
        );
      });
  }, [update, nowPage]);
  const searchData = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/menu", {
        startDate,
        endDate,
        nowPage,
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
      axios
      .post(process.env.REACT_APP_API_URL + "/admin/menu/pagenum", {
        startDate,
        endDate,
      })
      .then((res) => {
        setPageNum(
          res.data.count % 10
            ? parseInt(res.data.count / 10) + 1
            : res.data.count / 10
        );
      });
  };
  return (
    <>
      <div className="container">
        <div className="border-bottom align-self-center">
          <p
            className="p-4 font-weight-bold text-primary"
            style={{ marginBottom: 0 }}>
            식사 관리
          </p>
        </div>
        <div className="row">
          <div className="mr-5">
            <div className="col-md-12 mt-3  flex-row">
              <div className="col-md-5 d-inline ">
                <span className="text-primary">시작 날짜 : </span>
                <input
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                  style={{ width: "220px" }}
                  type="date"></input>
              </div>
              <div className="col-md-5 d-inline">
                <span className="text-primary">종료 날짜 : </span>{" "}
                <input
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                  style={{ width: "220px" }}
                  type="date"></input>
              </div>
              <div className="col-md-2 d-inline">
                <button
                  type="button"
                  className="btn btn-primary mr-3"
                  onClick={() => {
                    setNowPage(1);
                    searchData();
                  }}>
                  조회
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  id="addMenu"
                  onClick={() => {}}>
                  추가
                </button>
              </div>
            </div>
            <div className="col-md-12 ml-3 mt-3"></div>
          </div>
        </div>
        <div className="container no-gutters mt-3">
          <div className="row flex-row">
            <div className="col-md-9">
              <table className="table rounded-top">
                <colgroup>
                  <col width={"19%"}></col>
                  <col width={"27%"}></col>
                  <col width={"27%"}></col>
                  <col width={"27%"}></col>
                </colgroup>
                <thead>
                  <tr>
                    <th className="text-info text-center">날짜</th>
                    <th className="text-info text-center">아침</th>
                    <th className="text-info text-center">점심</th>
                    <th className="text-info text-center">저녁</th>
                  </tr>
                </thead>
                <tbody>
                  <MealTable data={data ? data : []}></MealTable>
                </tbody>
              </table>
              <NavBar
                setNowPage={setNowPage}
                nowPage={nowPage}
                pageNum={pageNum ? pageNum : 1}></NavBar>
            </div>
            <div
              className="col-md-3 border border-primary rounded-top"
              style={{ height: "70vh" }}>
              <UncontrolledCollapse className="h-100 w-100 " toggler="#addMenu">
                <div
                  className="d-flex flex-column justify-content-center ml-3"
                  style={{ height: "10%" }}>
                  <div className="text-center">날짜</div>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    style={{ width: "95%" }}></input>
                </div>
                <div className="mt-2 col-md-12 h-25">
                  <div className="p-1 border-bottom">
                    <p className="small text-center p-0 m-0">조식</p>
                  </div>
                  <textarea
                    className="form-control form-control-sm mt-1 h-75 w-100 t-small"
                    placeholder="공백문자(Space bar)로 메뉴를 구분해주세요"
                    value={breakfast}
                    onChange={(e) => setBreakfast(e.target.value)}
                    style={{ resize: "none" }}></textarea>
                </div>
                <div className="mt-2 col-md-12 h-25">
                  <div className="p-1 border-bottom">
                    <p className="small text-center p-0 m-0">중식</p>
                  </div>
                  <textarea
                    className="form-control form-control-sm mt-1 h-75 w-100"
                    placeholder="공백문자(Space bar)로 메뉴를 구분해주세요"
                    value={lunch}
                    onChange={(e) => setLunch(e.target.value)}
                    style={{ resize: "none" }}></textarea>
                </div>
                <div className="mt-2 col-md-12 h-25">
                  <div className="p-1 border-bottom">
                    <p className="small text-center p-0 m-0">석식</p>
                  </div>
                  <textarea
                    className="form-control form-control-sm mt-1 h-75 w-100"
                    placeholder="공백문자(Space bar)로 메뉴를 구분해주세요"
                    value={dinner}
                    onChange={(e) => setDinner(e.target.value)}
                    style={{ resize: "none" }}></textarea>
                </div>
                <div className="mt-2 text-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={submitMeal}>
                    적용
                  </button>
                </div>
              </UncontrolledCollapse>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MealManagePage;

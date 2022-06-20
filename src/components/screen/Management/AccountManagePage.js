import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import "../../css/tableStyle.css";
import AccountTable from "../makeTables/AccountTable";
function AccountManagePage() {
  const [data, setData] = useState();
  const onLoadData = () =>
    axios
      .post(process.env.REACT_APP_API_URL + "/admin/agree")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  useEffect(() => {
    onLoadData();
  }, []);
  return (
    <>
      <div className="container">
        <div className="border-bottom align-self-center">
          <p
            className="p-4 font-weight-bold text-primary"
            style={{ marginBottom: 0 }}>
            계정신청관리
          </p>
        </div>
        <div className="row">
          <div className="mr-5" style={{ textAlign: "center" }}>
            <div className="col-md-12 mt-3  flex-row">
              <div className="col-md-6 d-inline ">
                <span className="text-primary">시작 날짜 : </span>
                <input style={{ width: "220px" }} type="date"></input>
              </div>
              <div className="col-md-6 d-inline">
                <span className="text-primary">종료 날짜 : </span>{" "}
                <input style={{ width: "220px" }} type="date"></input>
              </div>
            </div>
            <div className="col-md-12 ml-3 mt-3">
              <div className="col-md-3 d-inline">
                <p className="text-primary d-inline mr-2">학번</p>
                <input></input>
              </div>
              <div className="col-md-3 d-inline">
                <p className="text-primary d-inline mr-2">이름</p>
                <input></input>
              </div>
              <div className="col-md-3 d-inline">
                <p className="text-primary d-inline mr-2">상태</p>
                <input></input>
              </div>
              <div className="col-md-3 d-inline">
                <button type="button" className="btn btn-primary">
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
                  <col width={"18%"}></col>
                  <col width={"18%"}></col>
                  <col width={"18%"}></col>
                  <col width={"18%"}></col>
                  <col width={"18%"}></col>
                  <col width={"10%"}></col>
                </colgroup>
                <thead>
                  <tr>
                    <th className="text-info text-center">학번</th>
                    <th className="text-info text-center">이름</th>
                    <th className="text-info text-center">전화번호</th>
                    <th className="text-info text-center">방번호</th>
                    <th className="text-info text-center">이메일</th>
                    <th className="text-info text-center">승인</th>
                  </tr>
                </thead>
                <tbody>
                  <AccountTable
                    data={data ? data : []}
                    onLoadData={onLoadData}></AccountTable>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AccountManagePage;

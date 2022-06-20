import React, { useState, useEffect } from "react";
import AsManagePage from "./Management/AsManagePage";
import MainPage from "./Management/MainPage";
import "../css/ManagementPage.css";
import { UncontrolledCollapse } from "reactstrap";
import HlthManagePage from "./Management/HlthManagePage";
import OutManagePage from "./Management/OutManagePage";
import BusManagePage from "./Management/BusManagePage";
import MealManagePage from "./Management/MealManagePage";
import BusInfoManagePage from "./Management/BusInfoManagePage";
import AccountManagePage from "./Management/AccountManagePage";
import axios from "axios";
function ManagementPageStack({ setIsLogined }) {
  const [mode, setMode] = useState(MainPage);
  const onLogOut = () => {
    axios
      .post(
        process.env.REACT_APP_API_URL + "/auth/logout",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        document.querySelector(".Logout").submit();
        setIsLogined(false);
      })
      .catch((err) => console.log(err));
  };
  const userCheck = () =>
    axios
      .post(
        process.env.REACT_APP_API_URL + "/auth/userCheck",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data) {
          setIsLogined(true);
        } else {
          alert("세션이 만료되었습니다.");
          setIsLogined(false);
        }
      });
  useEffect(() => {
    userCheck();
  });
  return (
    <>
      <nav className="navbar navbar-expend-md navbar-light">
        {/*         <button className="navbar-toggler ml-auto mb-3 bg-light" type="button">
          <span className="navbar-toggle-icon"></span>
        </button> */}
        <div className="navbar-collapse">
          <div className="container-field">
            <div className="row no-gutters">
              <div className="col-lg-2 col-sm-12 sidebar fixed-top border border-info">
                <div
                  className="text-center border-bottom mx-auto"
                  style={{ backgroundColor: "#0064ff" }}>
                  <p className="navbar-brand text-white mx-auto mb-0 py-3 align-self-center">
                    영진전문대학
                    <br /> 글로벌 캠퍼스
                  </p>
                </div>

                <ul className="navbar-nav flex-column mt-4 ml-3">
                  <li>
                    <p
                      role="button"
                      className="text-white mx-auto mb-0 py-3 align-self-center request-management"
                      id="manage">
                      예약관리
                    </p>
                    <ul>
                      <UncontrolledCollapse
                        toggler="#manage"
                        className="p-0 m-30 toggler">
                        <p
                          className="text-white mb-0 py-3 align-self-center border-bottom "
                          onClick={() => setMode(<AsManagePage />)}>
                          A/S
                        </p>
                        <p
                          className="text-white mb-0 py-3 align-self-center border-bottom"
                          onClick={() => setMode(<HlthManagePage />)}>
                          헬스
                        </p>
                        <p
                          className="text-white mb-0 py-3 align-self-center border-bottom"
                          onClick={() => setMode(<OutManagePage />)}>
                          외박
                        </p>{" "}
                        <p
                          className="text-white mb-0 py-3 align-self-center border-bottom"
                          onClick={() => setMode(<BusManagePage />)}>
                          셔틀버스
                        </p>
                      </UncontrolledCollapse>
                    </ul>
                  </li>
                  <li>
                    <p
                      role="button"
                      className="text-white mx-auto mb-0 py-3 align-item-center request-management"
                      id="ryo">
                      생활관 관리
                    </p>
                    <ul>
                      <UncontrolledCollapse
                        toggler="#ryo"
                        className="p-0 m-40 toggler">
                        <p
                          className="text-white mb-0 py-3 align-self-center border-bottom"
                          onClick={() => setMode(<MealManagePage />)}>
                          식단 관리
                        </p>
                        <p
                          className="text-white mb-0 py-3 align-self-center border-bottom"
                          onClick={() => setMode(<BusInfoManagePage />)}>
                          버스시간표 관리
                        </p>
                        <p
                          className="text-white mb-0 py-3 align-self-center border-bottom"
                          onClick={() => setMode(<AccountManagePage />)}>
                          계정추가
                        </p>
                      </UncontrolledCollapse>
                    </ul>
                  </li>
                </ul>
                <form
                  style={{ bottom: 0, position: "absolute" }}
                  className="Logout">
                  <p
                    className=" text-white pl-3 mx-auto mb-0 py-3 align-item-center request-management"
                    onClick={() => onLogOut()}>
                    로그아웃
                  </p>
                </form>
              </div>
              <div className="col-lg-10 ml-auto">
                <div children={mode}></div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default ManagementPageStack;

import "../css/LoginPage.css";
import React, { useCallback, useEffect, useState } from "react";
import ManagementPageStack from "./ManagementPageStack";
import axios from "axios";

/* import axios from "axios"; */

function LoginPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogined, setIsLogined] = useState(false);
  const login_process = useCallback(() => {
    axios
      .post(
        process.env.REACT_APP_API_URL + "/auth/admin/login",
        { username, password },
        { withCredentials: true }
      )
      .then((res) => (res.data ? setIsLogined(true) : alert("로그인 실패")))
      .catch((err) => console.log(err));
  }, [username, password]);
  useEffect(() => {
    axios
      .post(
        process.env.REACT_APP_API_URL + "/auth/userCheck",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data) {
          setIsLogined(true);
        }
      });
  });
  if (!isLogined) {
    return (
      <div
        style={{
          backgroundColor: "#0064ff",
          height: "100vh",
        }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-2"></div>
            <div className="col-lg-6 col-md-8 login-box">
              <div className="col-lg-12 login-key">
                <i className="fa fa-key" aria-hidden="true"></i>
              </div>
              <div className="col-lg-15 login-title text-primary">
                영진 전문 대학교
              </div>
              <div className="col-lg-12 login-title text-primary">
                관리자 로그인
              </div>
              <div className="col-lg-12 login-form">
                <div className="col-lg-12 login-form">
                  <div className="form-group ">
                    <label className="form-control-label">USERNAME</label>
                    <input
                      type="text"
                      className="form-control-login form-control"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">PASSWORD</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>

                  <div className="col-lg-12 loginbttm">
                    <div className="col-lg-6 login-btm login-text"></div>
                    <div className="col-lg-6 login-btm login-button">
                      <button
                        type="submit"
                        className="btn btn-outline-primary"
                        onClick={() => {
                          login_process();
                        }}>
                        LOGIN
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div
          className="w-100 h-100"
          children={<ManagementPageStack setIsLogined={setIsLogined} />}></div>
      </>
    );
  }
}

export default LoginPage;

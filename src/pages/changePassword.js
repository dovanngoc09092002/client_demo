import "../css/changepass.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { delete_cookie } from "../cookie";
function ChangePassword() {
  const [pass, setPass] = useState({
    currentPass: "",
    newPass: "",
  });
  const Navigate = useNavigate();
  const [error, setError] = useState({
    isError: false,
    messError: "",
  });
  const handleClickChangePass = () => {
    axios
      .post(`https://api-ngoc.onrender.com/user/changePassword`, pass, {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
        if (data.data.errCode === 1) {
          setError({
            isError: true,
            messError: data.data.message,
          });
        }
        if (data.data.errCode === 0) {
          delete_cookie("token");
          Navigate("/login");
        }
      });
  };
  return (
    <div className="fl changepass">
      <div className="changePassword">
        <div className="" style={{ width: "100%", textAlign: "center" }}>
          <FontAwesomeIcon
            icon={faUser}
            style={{
              fontSize: "100px",
              color: "#333",
            }}
          />
          <h3> Đổi Mật Khẩu </h3>
        </div>
        <br />
        <div className="fl" style={{ alignItems: "center" }}>
          <label className="fl1">Mật Khẩu Hiện Tại</label>
          <input
            value={pass.currentPass}
            placeholder="Mật Khẩu Hiện Tại"
            className="input_changepass fl2"
            onChange={(e) => {
              setPass({ ...pass, currentPass: e.target.value });
            }}
          />
        </div>
        <div className="fl" style={{ alignItems: "center", marginTop: "20px" }}>
          <label className="fl1">Mật Khẩu Mới</label>
          <input
            value={pass.newPass}
            placeholder="Mật Khẩu Mới"
            className="input_changepass fl2"
            onChange={(e) => {
              setPass({ ...pass, newPass: e.target.value });
            }}
          />
        </div>
        <div style={{ width: "100%", textAlign: "center", padding: "5px 0px" }}>
          {error.isError && (
            <span
              style={{
                width: "100%",
                textAlign: "center",
                color: "red",
                fontSize: "18px",
              }}
            >
              {error.messError}
            </span>
          )}
        </div>
        <br />
        <button className="btn_changepass  " onClick={handleClickChangePass}>
          Cập Nhật
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;

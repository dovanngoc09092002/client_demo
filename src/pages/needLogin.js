import "../css/needlogin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faArrowRightFromBracket,
  faArrowRotateRight,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function NeedLogin() {
  return (
    <div className="body_dangnhap">
      <div className="bancandangnhap">
        <img
          alt=""
          src="https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/512/User_login_man_profile_account.png"
          style={{ height: "200px" }}
        />
        <h3 style={{ padding : '10px 0px' }}>BẠN CẦN ĐĂNG NHẬP _ ĐĂNG KÝ</h3>

        <div className="bancandangnhap_btn fl">
          <div className="">
            <NavLink to="/login" className="bancandangnhap_login ">
              
              <span> Đăng Nhập</span>
            </NavLink>
          </div>
          <div>
            <NavLink to="/register" className="bancandangnhap_login">
              <span> Đăng Ký</span>
              
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NeedLogin;

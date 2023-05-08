/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/header.css";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faEnvelope,
  faHome,
  faHomeLg,
  faLock,
  faMessage,
  faRegistered,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import "react-pure-modal/dist/react-pure-modal.min.css";
import axios from "axios";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import ViewMessage from "./viewMessage";
import { delete_cookie, getCookie } from "../cookie";
import ItemSearch from "./ItemSearch";

function Header() {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [listUser, setListUser] = useState([]);
  const [display, setDisplay] = useState(false);
  const boxRefs = useRef([null, null]);
  const [isOpen, setIsOpen] = useState(false);
  const token = getCookie("token");

  const close = () => {
    setDisplay(false);
  };
  const onSearch = (text) => {
    axios
      .post(
        "https://api-ngoc.onrender.com/user/search",
        { search: text },
        { withCredentials: true }
      )
      .then((data) => {
        setListUser([...data.data.data]);
        setDisplay(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (searchTerm) {
      const delayDebounceFn = setTimeout(() => {
        onSearch(searchTerm);
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
    if (!searchTerm) {
      setDisplay(false);
    }
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [viewmess, setViewmess] = useState([]);
  const handleClickTrangCaNhan = () => {
    navigate("/profile");
    setIsBoxOpen(false);
  };
  useEffect(() => {
    if (token) {
      axios
        .get("https://api-ngoc.onrender.com/user/profilebyjwt", {
          withCredentials: true,
        })
        .then((data) => {
          setUser({ ...data.data.user });
        })
        .catch((err) => {
          console.log("err : ", err);
        });
      axios
        .get("https://api-ngoc.onrender.com/user/userandmess", {
          withCredentials: true,
        })
        .then((data) => {
          setViewmess([...data.data.result]);
        });
    }
  }, [isOpen]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        boxRefs.current[0] &&
        boxRefs.current[1] &&
        !boxRefs.current[0].contains(event.target) &&
        !boxRefs.current[1].contains(event.target)
      ) {
        setIsBoxOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [boxRefs]);
  const handleLogout = () => {
    axios
      .get("https://api-ngoc.onrender.com/user/logout", {
        withCredentials: true,
      })
      .then((data) => {
        console.log("log out ...");
        console.log(data);
        if (data.data.isLogout === true) {
          delete_cookie("token");
          navigate("/login");
        }
      });
  };
  return (
    <>
      <div className="header containersub fl">
        <div className="header_logo fl1"></div>
        <div className="header_search fl1">
          <input
            className="header_search_post"
            type="text"
            placeholder="Tìm kiếm trên memory"
            value={searchTerm}
            onChange={handleChange}
          />
          {display && (
            <div className="box_search">
              {listUser &&
                listUser.length > 0 &&
                listUser.map((user, index) => {
                  return (
                    <div key={index}>
                      <ItemSearch user={user} close={close} />
                    </div>
                  );
                })}

              <h3
                style={{
                  fontSize: "16px",
                  color: "#0676c9",
                  cursor: "pointer",
                  padding: "5px 0px",
                }}
              >
                Xem Tất Cả
              </h3>
            </div>
          )}
        </div>
        <div className="header_navbar fl2">
          <span>
            <NavLink to="/">
              <FontAwesomeIcon style={{ paddingRight: "5px" }} icon={faHome} />
              TRANG CHỦ
            </NavLink>
          </span>
          <span>
            <NavLink to="/">
              <FontAwesomeIcon
                style={{ paddingRight: "5px" }}
                icon={faCircleInfo}
              />
              THÔNG TIN
            </NavLink>
          </span>
        </div>
        {token ? (
          <>
            <div className="fl1 fl header_avatar_icon_mess">
              <div
                className="fl1"
                onClick={() => {
                  navigate("/makefriends");
                }}
              >
                <FontAwesomeIcon
                  style={{
                    fontSize: "30px",
                    color: "#3bb7ff",
                    cursor: "pointer",
                  }}
                  icon={faEnvelope}
                />
              </div>

              <div className="fl1">
                <FontAwesomeIcon
                  onClick={handleToggle}
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    color: "#3bb7ff",
                    position: "relative",
                  }}
                  icon={faMessage}
                >
                  {" "}
                </FontAwesomeIcon>
                <div className="hyhy">
                  <Tippy
                    visible={isOpen}
                    placement="bottom"
                    interactive={true}
                    onClickOutside={handleToggle}
                    content={
                      <div className="box_message_withfriends">
                        {viewmess && viewmess.length === 0 && (
                          <h3 style={{ color: "#333" }}>
                            {" "}
                            Kết bạn để nhắn tin{" "}
                          </h3>
                        )}
                        {viewmess &&
                          viewmess.length > 0 &&
                          viewmess.map((item, index) => {
                            return item ? (
                              <div key={index}>
                                <ViewMessage
                                  mess={item}
                                  check={
                                    item.senderId === user.id ? true : false
                                  }
                                />
                              </div>
                            ) : (
                              <></>
                            );
                          })}
                      </div>
                    }
                  >
                    <div></div>
                  </Tippy>
                </div>
              </div>
              <div
                ref={(ref) => (boxRefs.current[1] = ref)}
                onClick={() => {
                  setIsBoxOpen(!isBoxOpen);
                }}
                className="fl1"
              >
                <img
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50px",
                  }}
                  alt=""
                  src={user.avatar}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="header_login fl1_5">
            <span>
              <NavLink to="/login">
                <FontAwesomeIcon
                  style={{ paddingRight: "5px" }}
                  icon={faRightToBracket}
                />
                ĐĂNG NHẬP
              </NavLink>
            </span>
            <span>
              <NavLink to="/register">
                <FontAwesomeIcon
                  style={{ paddingRight: "5px" }}
                  icon={faRegistered}
                />
                ĐĂNG KÝ
              </NavLink>
            </span>
          </div>
        )}
      </div>
      {isBoxOpen && (
        <div
          className="modal_profile box"
          ref={(ref) => (boxRefs.current[0] = ref)}
        >
          <div className="modal_profile_header w100">
            <img
              className="modal_profile_header_img"
              alt=""
              src={user.avatar}
            />
            <span> {user.name} </span>
          </div>
          <div className="modal_profile_body w100">
            <div className="modal_profile_item w100">
              <div onClick={handleClickTrangCaNhan}>
                <FontAwesomeIcon
                  style={{ marginRight: "10px" }}
                  icon={faHomeLg}
                />
                Xem trang cá nhân
              </div>
            </div>
            <div
              className="modal_profile_item w100"
              onClick={() => {
                navigate("/changepassword");
                setIsBoxOpen(false);
              }}
            >
              <FontAwesomeIcon style={{ marginRight: "10px" }} icon={faLock} />
              Đổi mật khẩu
            </div>
          </div>
          <div className="modal_profile_footer w100" onClick={handleLogout}>
            <div className="modal_profile_item w100">
              <FontAwesomeIcon
                style={{ marginRight: "10px" }}
                icon={faRightToBracket}
              />
              Đăng xuất
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;

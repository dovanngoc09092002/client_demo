/* eslint-disable react-hooks/exhaustive-deps */
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { SwiperSlide } from "swiper/react";
import axios from "axios";
function ItemForSlide({ pageVideo }) {
  const Navigate = useNavigate();
  const [profile, setProfile] = useState({});
  useEffect(() => {
    axios
      .get("https://api-ngoc.onrender.com/user/profilebyjwt", {
        withCredentials: true,
      })
      .then((data) => {
        setProfile({ ...data.data.user });
      });

    axios
      .get(
        `https://api-ngoc.onrender.com/video/get?page=${pageVideo}&limit=5`,
        {
          withCredentials: true,
        }
      )
      .then((data) => {});
  }, []);
  return (
    <SwiperSlide>
      <div className="videotin_list fl">
        <div
          onClick={() => {
            Navigate("/create/video");
          }}
          className="videotin_item"
          style={{ width: "16.6%" }}
        >
          <img
            className="videotin_item_img"
            style={{ width: "100%" }}
            alt=""
            src={profile.avatar}
          />
          <div className="videotin_item_footer">
            <FontAwesomeIcon
              style={{ fontSize: "30px", color: "#ddd" }}
              icon={faAdd}
            />
          </div>
        </div>
        <div className="videotin_item" style={{ width: "16.6%" }}>
          <img className="avatarInVideoItem" alt="" src="" />
          <img
            className="videotin_item_img videotin_item_img_sub"
            style={{ width: "100%" }}
            alt=""
            src=""
          />
          <div className="videotin_item_footer videotin_item_footer_sub">
            Thu Thảo
          </div>
        </div>
        <div className="videotin_item" style={{ width: "16.6%" }}>
          <img className="avatarInVideoItem" alt="" src="" />
          <img
            className="videotin_item_img videotin_item_img_sub"
            style={{ width: "100%" }}
            alt=""
            src=""
          />
          <div className="videotin_item_footer videotin_item_footer_sub">
            Thu Thảo
          </div>
        </div>
        <div className="videotin_item" style={{ width: "16.6%" }}>
          <img className="avatarInVideoItem" alt="" src="" />
          <img
            className="videotin_item_img videotin_item_img_sub"
            style={{ width: "100%" }}
            alt=""
            src=""
          />
          <div className="videotin_item_footer videotin_item_footer_sub">
            Thu Thảo
          </div>
        </div>
        <div className="videotin_item" style={{ width: "16.6%" }}>
          <img className="avatarInVideoItem" alt="" src="" />
          <img
            className="videotin_item_img videotin_item_img_sub"
            style={{ width: "100%" }}
            alt=""
            src=""
          />
          <div className="videotin_item_footer videotin_item_footer_sub">
            Thu Thảo
          </div>
        </div>
        <div className="videotin_item" style={{ width: "16.6%" }}>
          <img className="avatarInVideoItem" alt="" src="" />
          <img
            className="videotin_item_img videotin_item_img_sub"
            style={{ width: "100%" }}
            alt=""
            src=""
          />
          <div className="videotin_item_footer videotin_item_footer_sub">
            Thu Thảo
          </div>
        </div>
      </div>
    </SwiperSlide>
  );
}

export default ItemForSlide;

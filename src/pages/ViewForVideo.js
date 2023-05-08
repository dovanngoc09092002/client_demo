import "../css/viewforvideo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import { getVideoPage } from "../api";

function ViewForVideo() {
  const { id } = useParams();
  const [page, setPage] = useState(0);

  const [video, setVideo] = useState({});

  const Navigate = useNavigate();
  const handleClickToA = () => {
    Navigate(`/profile/${video.user.id}`);
  };
  //  const handleClickToB = () =>{
  // Navigate(`/mess/${video.user.id}`)
  //  }
  useEffect(() => {
    axios
      .get(`https://api-ngoc.onrender.com/video/getbyid/${id}`, {
        withCredentials: true,
      })
      .then((data) => {
        setVideo({ ...data.data.data });
      });
  }, [id]);
  const nextToVideo = (page, limit) => {
    const newpage = parseInt(page) + 1;
    const newlimit = parseInt(limit);
    getVideoPage(newpage, newlimit).then((data) => {
      console.log("this is data", data);
      if (data.data.results.length === 0) {
        Navigate("/");
      }
      setVideo({ ...data.data.results[0] });
      setPage(page + 1);
    });
  };
  const PreToVideo = (page, limit) => {
    if (page === 0) {
      Navigate("/");
    } else {
      const newpage = parseInt(page) - 1;
      const newlimit = parseInt(limit);
      getVideoPage(newpage, newlimit).then((data) => {
        setVideo({ ...data.data.results[0] });
        setPage(page - 1);
      });
    }
  };
  return (
    <>
      <div className="viewvideo fl">
        <div className="viewvideo_nav fl1">
          <img
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "150px",
              marginTop: "50px",
            }}
            alt=""
            src={video && video.user && video.user.avatar}
          />
          <div> @{video && video.user && video.user.username} </div>
          <div className="fl">
            <div className="fl1 iconforvideo" onClick={handleClickToA}>
              <FontAwesomeIcon icon={faHome} />

              <br />

              <span> Cá Nhân </span>
            </div>
          </div>
        </div>
        <div className="viewvideo_content fl3 fl">
          <div
            className="fl1 nexttoleft nextto"
            onClick={() => {
              PreToVideo(page, 1);
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div className="fl3 viewvideo_content_view">
            <ReactPlayer
              className="react-player"
              url={video && video.video}
              controls={true}
              width="100%"
            />
          </div>

          <div
            className="fl1 nexttoright nextto"
            onClick={() => nextToVideo(page, 1)}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewForVideo;

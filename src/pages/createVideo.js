import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { css } from "@emotion/core";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";
import "../css/createvideo.css";
import { storage } from "../firebase";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faVideo } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";
import ReactjsAlert from "reactjs-alert";

function CreateVideo() {
  const [profile, setProfile] = useState({});

  const [isLoading, setIsloading] = useState(false);

  const [isLoading2, setIsloading2] = useState(false);

  const [status, setStatus] = useState(false);

  const [video, setVideo] = useState({
    video: "",
    image: "",
  });

  const handleUploadfile = (e) => {
    setIsloading(true);
    let file = e.target.files[0];
    const imageRef = ref(storage, `video/${file.name + v4()}`);
    uploadBytes(imageRef, file)
      .then((snapshot) => {
        return new Promise((resolve, reject) => {
          try {
            const downloadURL = getDownloadURL(snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error.message);
          }
        });
      })
      .then((data) => {
        setVideo({ ...video, video: data });
        setIsloading(false);
      });
  };

  const handleUploadfile2 = (e) => {
    setIsloading2(true);
    let file = e.target.files[0];
    const imageRef = ref(storage, `video/${file.name + v4()}`);
    uploadBytes(imageRef, file)
      .then((snapshot) => {
        return new Promise((resolve, reject) => {
          try {
            const downloadURL = getDownloadURL(snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error.message);
          }
        });
      })
      .then((data) => {
        setVideo({ ...video, image: data });
        setIsloading2(false);
      });
  };

  const handleClickCreateVideo = () => {
    if (!video.image || !video.image) {
      setStatus(true);
      return;
    }
    axios
      .post("https://api-ngoc.onrender.com/video/create", video, {
        withCredentials: true,
      })
      .then((data) => {
        setVideo({
          video: "",
          image: "",
        });
      });
  };

  useEffect(() => {
    axios
      .get("https://api-ngoc.onrender.com/user/profilebyjwt", {
        withCredentials: true,
      })
      .then((data) => {
        setProfile({ ...data.data.user });
      });
  }, []);

  return (
    <>
      <div className="createVideo fl">
        <div className="createVideo_menu fl1">
          <div className="creatte_anhdaihien fl">
            <img className="createVideo_avatar" alt="" src={profile.avatar} />
            <span> {profile.name} </span>
          </div>
          <input
            type="file"
            id="uploadvideo"
            accept="video/*"
            hidden
            onChange={(e) => handleUploadfile(e)}
          ></input>
          <input
            type="file"
            id="uploadimage"
            accept="image/*"
            hidden
            onChange={(e) => handleUploadfile2(e)}
          ></input>

          <div
            style={{
              cursor: video.video && video.image ? "pointer" : "not-allowed",
              background: video.video && video.image ? "#2678a8" : "#999",
            }}
            className="createVideo_btn"
            onClick={handleClickCreateVideo}
          >
            Thêm Video
          </div>
          <div
            className="sub_edit_video"
            onClick={() => setVideo({ ...video, video: "" })}
          >
            {" "}
            <FontAwesomeIcon style={{ color: "#3bb7ff" }} icon={faVideo} /> Thay
            Đổi Video
          </div>
          <div
            className="sub_edit_video"
            onClick={() => setVideo({ ...video, image: "" })}
          >
            <FontAwesomeIcon style={{ color: "#3bb7ff" }} icon={faImage} />
            Thay Đổi Ảnh Thu Nhỏ
          </div>
        </div>
        <div className="createVideo_content fl3 fl">
          {video.video ? (
            <ReactPlayer
              className="react-player fl1 previewinvideo"
              url={video.video}
              controls={true}
              width="100%"
            />
          ) : (
            <div className="createVideo_content_video fl1 ">
              <label style={{ cursor: "pointer" }} htmlFor="uploadvideo">
                Thêm Video
                <br />
                <FontAwesomeIcon
                  className="icon_in_create_video"
                  icon={faVideo}
                />
                <div>
                  {isLoading && (
                    <>
                      <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={["#ddd", "#fff", "#fff", "#fff", "#fff"]}
                      />
                    </>
                  )}
                </div>
              </label>
            </div>
          )}
          {video.image ? (
            <div className="fl1 previewinvideo">
              <img
                alt=""
                src={video.image}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ) : (
            <div className="createVideo_content_video createVideo_content_video_sub fl1 ">
              <label htmlFor="uploadimage" style={{ cursor: "pointer" }}>
                Thêm Ảnh Thu Nhỏ
                <br />
                <FontAwesomeIcon
                  className="icon_in_create_video"
                  icon={faImage}
                />
                <div>
                  {isLoading2 && (
                    <>
                      <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={["#ddd", "#fff", "#fff", "#fff", "#fff"]}
                      />
                    </>
                  )}
                </div>
              </label>
            </div>
          )}
        </div>
      </div>

      <ReactjsAlert
        status={status} // true or false
        type="info" // success, warning, error, info
        title="Bạn cần upload video và ảnh thu nhỏ cho video của bạn"
        Close={() => setStatus(false)}
      />
    </>
  );
}

export default CreateVideo;

/* eslint-disable react-hooks/exhaustive-deps */
import "../css/videome.css";
import { useNavigate } from "react-router-dom";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { Swiper, SwiperSlide } from "swiper/react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import { getVideoByJWT, updateVideo, deleteVideo } from "../api";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faEdit,
  faImage,
  faTrash,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../firebase";
import { ColorRing } from "react-loader-spinner";
function VideoForMe() {
  const nav = useNavigate();
  const [isLoadding, setIsloadding] = useState(false);
  const [render , setRender] = useState(false);
  const [videos, setVideos] = useState([]);
  const [modal, setModal] = useState(false);
  const [newvideo, setNewVideo] = useState({
    id: "",
    video: "",
    image: "",
  });
  useEffect(() => {
    getVideoByJWT()
      .then((data) => {
        
        setVideos([...data.data.data]);
      })
      .catch((err) => console.log(err));
  }, [render]);
  const handleClickEditVideo = (item) => {
    setNewVideo({
      id: item.id,
      video: item.video,
      image: item.image,
    });
    setModal(true);
  };
  const handleUploadfile = (e) => {
    setIsloadding(true);
    let file = e.target.files[0];
    const imageRef = ref(storage, `images/${file.name + v4()}`);
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
        setIsloadding(false);
        console.log("this is new data", data);
        setNewVideo({
          ...newvideo,
          image: data,
        });
      });
  };

  const handleUploadfileVideo = (e) => {
    setIsloadding(true);
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
        setIsloadding(false);
        console.log("this is new data", data);
        setNewVideo({
          ...newvideo,
          video: data,
        });
      });
  };
  const updateVd = () => {
   
    updateVideo(newvideo).then((data) => {
      setModal(false);
     setRender(!render)
    });
  };
  const deleteVideoNow = (id) => {

    deleteVideo({id : id})
    .then(data => {
      setRender(!render)
    })
   
  } 
  
  return (
    <>
      {videos && videos.length === 0 && (
        <div className="fl chuacovideo">
          <h3> Bạn chưa có video nào </h3>
          <div
            onClick={()=>{ nav("/create/video"); }}
            style={{
              padding: "10px 12px",
              cursor: "pointer",
              background: "#3bb7ff",
            }}
          >
            Thêm Tin <FontAwesomeIcon icon={faAdd} />
          </div>{" "}
        </div>
      )}
      <div className="videome fl">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {videos &&
            videos.length > 0 &&
            videos.map((item, index) => {
              return (
                <>
                  <SwiperSlide key={index}>
                    <div className="videome_box ">
                      <ReactPlayer
                        className="react-player"
                        url={item.video}
                        controls={true}
                        width="100%"
                      />

                      <div className="btn_video">
                        <Tippy content="Chỉnh sửa">
                          <div
                            className="chinhsuavideo icon_video"
                            onClick={() => handleClickEditVideo(item)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </div>
                        </Tippy>
                        <Tippy content="Xóa">
                          <div
                            className="xoavideo icon_video"
                            onClick={() => deleteVideoNow(item.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </div>
                        </Tippy>
                      </div>
                    </div>
                  </SwiperSlide>
                  ;
                </>
              );
            })}
        </Swiper>
      </div>
      <PureModal
        header="Chỉnh Sửa Tin"
        isOpen={modal}
        closeButton="close"
        closeButtonPosition="bottom"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <div className="latevideo fl" style={{ height: "150px" }}>
          <ReactPlayer
            className="react-player fl1 item_update_video"
            url={newvideo.video && newvideo.video}
            controls={true}
            width="100%"
          />
          <img
            className="fl1 item_update_video"
            style={{ height: "100%" }}
            alt=""
            src={newvideo.image && newvideo.image}
          />
        </div>
        <div className="btn_updatevideo fl">
          <input
            type="file"
            accept="video/*"
            id="updatevideovideo"
            hidden
            onChange={(e) => handleUploadfileVideo(e)}
          />
          <input
            type="file"
            accept="image/*"
            id="updateimagevideo"
            hidden
            onChange={(e) => handleUploadfile(e)}
          />

          <label className="fl1 updateforvideo" htmlFor="updatevideovideo">
            <FontAwesomeIcon icon={faVideo} /> Video
          </label>
          <label className="fl1 updateforvideo" htmlFor="updateimagevideo">
            <FontAwesomeIcon icon={faImage} /> Hình Ảnh
          </label>
        </div>
        <div className="btn_loadding fl">
          <button
            onClick={updateVd}
            style={{
              padding: "10px 10px",
              fontSize: "18px",
              margin: "10px 0px",
              cursor: "pointer",
              background: "#3bb7ff",
              color: "#ddd",
              border: "none",
            }}
          >
            {" "}
            Cập Nhật{" "}
          </button>
          {isLoadding && (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#3bb7ff", "#3bb7ff", "#3bb7ff", "#3bb7ff", "#3bb7ff"]}
            />
          )}
        </div>
      </PureModal>
    </>
  );
}

export default VideoForMe;

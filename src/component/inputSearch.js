import "../css/inputSearch.css";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { v4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlag,
  faImage,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
function InputSearch(props) {
  const [isLoadding, setIsloadding] = useState(false);
  const [modal, setModal] = useState(false);
  const [post, setPost] = useState({
    postText: "",
    postImage: "",
  });
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
        setPost({
          ...post,
          postImage: data,
        });
      });
  };
  const handleCreatePost = () => {
    axios
      .post("https://api-ngoc.onrender.com/post", post, {
        withCredentials: true,
      })
      .then((data) => {
        setPost({ ...post, postImage: "", postText: "" });
        setModal(false);

        props.callback(data.data.data);

        // handleRefresh()
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="fl inputsearch">
        <img alt="" src={props.avatar} className="inputsearch_img" />

        <div className="inputsearch_input" onClick={() => setModal(true)}>
          Bạn đang nghĩ gì ?
        </div>
      </div>
      <div className="inputsearch_footer fl">
        <span className="inputsearch_image" onClick={() => setModal(true)}>
          <FontAwesomeIcon style={{ color: "#45bd62" }} icon={faImage} />
          Ảnh/Video
        </span>
        <span className="inputsearch_image" onClick={() => setModal(true)}>
          <FontAwesomeIcon style={{ color: "#3bb7ff" }} icon={faFlag} /> Sự kiện
          trong đời
        </span>
      </div>
      <PureModal
        isOpen={modal}
        closeButtonPosition="bottom"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <>
          <h3 className="puremodal_header"> Tạo bài viết </h3>
          <input
            className="puremodal_input"
            value={post.postText}
            placeholder="Bạn đang nghĩ gì ?"
            onChange={(e) => setPost({ ...post, postText: e.target.value })}
          />
          <div className="puremodal_img">
            <input
              type="file"
              id="PreviewImg"
              hidden
              onChange={(e) => handleUploadfile(e)}
            />
            <div>
              {isLoadding ? (
                <>
                  <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[
                      "#3bb7ff",
                      "#3bb7ff",
                      "#3bb7ff",
                      "#3bb7ff",
                      "#3bb7ff",
                    ]}
                  />
                </>
              ) : (
                <label className="PreviewImg" htmlFor="PreviewImg">
                  <FontAwesomeIcon icon={faPlusSquare} /> Thêm Ảnh
                </label>
              )}
            </div>
            <div>
              <img
                style={{
                  width: "100%",
                  position: "relative",
                }}
                alt=""
                src={post.postImage}
              />
            </div>
          </div>
          {post.postText ? (
            <>
              <button className="puremodal_button" onClick={handleCreatePost}>
                Đăng
              </button>
            </>
          ) : (
            <>
              <button className="puremodal_button puremodal_button_noclick">
                Đăng
              </button>
            </>
          )}
        </>
      </PureModal>
    </>
  );
}

export default InputSearch;

/* eslint-disable react-hooks/exhaustive-deps */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/post.css";
import PureModal from "react-pure-modal";
import { useNavigate } from "react-router";
import {
  faComment,
  faEdit,
  faImage,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";

import { getPostById, updatePostById } from "../api";
import Loadding from "./loadding";
import axios from "axios";

function Post(props) {
  const navigate = useNavigate();
  const [isLoadding, setIsloadding] = useState(false);
  const [modal, setModal] = useState(false);
  const [like, setLike] = useState({
    number: 0,
    isLike: false,
  });
  useEffect(() => {
    if (props.post.id) {
      axios
        .post(
          "https://api-ngoc.onrender.com/like/islike",
          {
            PostId: props.post.id,
          },
          { withCredentials: true }
        )
        .then((data) => {
          setLike({
            ...like,
            isLike: data.data.data,
            number: parseInt(props.post.likes),
          });
        })
        .catch((err) => console.log("err is", err));
    }
  }, [props.post.id]);
  const [update, setUpdate] = useState({
    postText: "",
    postImage: "",
  });

  const handleUploadfile = (e) => {
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
        setUpdate({ ...update, postImage: data });
      });
  };
  const handleUpdate = () => {
    setIsloadding(true);
    window.location.reload();

    updatePostById(update, props.post.id).then((data) => {
      if (data.data.errCode === 0) {
        setIsloadding(false);

        setModal(false);
      }
    });
  };

  const handleClickEditPost = (id) => {
    getPostById(id).then((data) => {
      setUpdate({
        postText: data.data.data.postText,
        postImage: data.data.data.postImage,
      });
      setModal(true);
    });
  };

  const handleClickLike = (id) => {
    if (like.isLike) {
      setLike((prevState) => ({
        ...prevState,
        number: prevState.number - 1,
        isLike: false,
      }));
    }
    if (!like.isLike) {
      setLike((prevState) => ({
        ...prevState,
        number: prevState.number + 1,
        isLike: true,
      }));
    }

    axios
      .post(
        "https://api-ngoc.onrender.com/like/check",
        { PostId: parseInt(id) },
        { withCredentials: true }
      )
      .then((data) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {isLoadding && <Loadding />}
      <div className="post">
        <div className="post_header fl">
          <img
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
            alt=""
            src={props.profile.avatar}
          />
          <span className="post_header_name fl3">
            {props.profile.name} @{props.profile.username}
          </span>
          {props.check && (
            <div
              className="edit_for_post fl1"
              onClick={() => {
                handleClickEditPost(props.post.id);
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
            </div>
          )}
        </div>
        <div className="post_body">
          <div className="post_body_message">{props.post.postText}</div>
          <div className="post_body_image">
            <img style={{ width: "100%" }} alt="" src={props.post.postImage} />
          </div>
        </div>
        <div className="post_body_footer">
          <span
            className="like"
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleClickLike(props.post.id);
            }}
          >
            <span> {like.number} </span>{" "}
            <FontAwesomeIcon
              style={{
                color: like.isLike ? " blue" : "#333",
                fontSize: "18px",
              }}
              icon={faThumbsUp}
            />
            Thích
          </span>
          <span
            className="comment"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/post/${props.post.id}`);
            }}
          >
            <span> </span>
            <FontAwesomeIcon style={{ color: "#3bb7ff" }} icon={faComment} />
            Bình Luận
          </span>
        </div>
      </div>

      <PureModal
        isOpen={modal}
        closeButtonPosition="bottom"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <div className="edit_personal_input">
          <h3
            style={{ textAlign: "center", color: "#3bb7ff", fontSize: "20px" }}
          >
            Chỉnh sửa Post
          </h3>

          <input
            value={update.postText}
            className="w100 edit_personal"
            placeholder="ex. nam"
            onChange={(e) => setUpdate({ ...update, postText: e.target.value })}
          />
          <input
            type="file"
            id="inputuploadfileavatar"
            hidden
            onChange={(e) => {
              handleUploadfile(e);
            }}
          />
          <label
            className="w100 edit_personal label_uploadfile"
            htmlFor="inputuploadfileavatar"
          >
            + <FontAwesomeIcon icon={faImage} />
          </label>
          <br />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "10px 0px",
            }}
          >
            <img
              style={{
                width: "70%",
                boxShadow: " rgba(3, 102, 214, 0.3) 0px 0px 0px 3px",
              }}
              alt=""
              src={update.postImage}
            />
          </div>
          <div className="capnhatnguoidung" onClick={handleUpdate}>
            Cập nhật{" "}
          </div>
        </div>
      </PureModal>
    </>
  );
}

export default Post;

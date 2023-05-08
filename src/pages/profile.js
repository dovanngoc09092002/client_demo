/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import "../css/profile.css";
import UserSmall from "../component/user_small";
import PureModal from "react-pure-modal";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import Post from "../component/post";
import InputSearch from "../component/inputSearch";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "../cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faImage } from "@fortawesome/free-solid-svg-icons";
function Profile() {
  const token = getCookie("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);
  // const [render, setRender] = useState(false);
  const [images, setImages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [modal, setModal] = useState(false);
  const [profile, setProfile] = useState({});
  const [update, setUpdate] = useState({
    username: "",
    name: "",
    avatar: "",
  });

  useEffect(() => {
    axios
      .get("https://api-ngoc.onrender.com/user/profilebyjwt", {
        withCredentials: true,
      })
      .then((data) => {
        setProfile({ ...data.data.user });
        setUpdate({
          username: data.data.user.username,
          name: data.data.user.name,
          avatar: data.data.user.avatar,
        });
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://api-ngoc.onrender.com/post/getimages", {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
        setImages([...data.data.data]);
      });
  }, []);

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
        setUpdate({ ...update, avatar: data });
      });
  };
  const handleUpdate = () => {
    //update user
    axios
      .post("https://api-ngoc.onrender.com/user/update", update, {
        withCredentials: true,
      })
      .then((data) => {
        setModal(false);
        window.location.reload();
      });
  };
  useEffect(() => {
    axios
      .get("https://api-ngoc.onrender.com/friend/friends", {
        withCredentials: true,
      })
      .then((data) => {
        setFriends([...data.data.friendsById]);
      });
  }, []);
  const callbackRender = () => {
    window.location.reload();
  };
  // new
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [endOfData, setEndOfData] = useState(false);
  useEffect(() => {
    loadPosts();
  }, []);
  function loadPosts() {
    if (loading || endOfData) {
      return;
    }
    setLoading(true);
    axios
      .get(`https://api-ngoc.onrender.com/post/posts?page=${page}&limit=3`, {
        withCredentials: true,
      })
      .then((response) => {
        const newPosts = response.data.posts;

        if (newPosts.length > 0) {
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
          setPage(page + 1);
          setLoading(false);
        } else {
          setEndOfData(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        alert(
          "Có lỗi xảy ra trong quá trình tải dữ liệu, vui lòng thử lại sau!"
        );
        setLoading(false);
      });
  }
  function handleScroll() {
    if (
      !loading &&
      !endOfData &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight
    ) {
      loadPosts();
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <div class="authorboxwrap">
        <div class="authorboxfull">
          <div class="avatar-container">
            <img
              alt="iHus sam"
              class="author_avatar"
              height="110"
              src={profile.avatar}
              width="110"
            />
          </div>
          <div class="author_description_container">
            <div class="author-bar">
              <div class="author-data">
                Tên :
                <a
                  class="g-profile"
                  href="#"
                  rel="author"
                  title="الكاتب"
                  data-gapiscan="true"
                  data-onload="true"
                  data-gapiattached="true"
                >
                  <span itemprop="name">
                    {" "}
                    {profile.name} --- @{profile.username}
                  </span>
                </a>
              </div>

              <div class="author-social">
                <ul class="spicesocialwidget">
                  <li
                    class="facebook ar1web-tooltip ar1web-tooltip-top"
                    data-ar1web-tooltip="Facebook"
                  >
                    <a
                      href="https://www.facebook.com/"
                      rel="nofollow"
                      target="_blank"
                    ></a>
                  </li>
                  <li
                    class="googleplus ar1web-tooltip ar1web-tooltip-top"
                    data-ar1web-tooltip="Google+"
                  >
                    <a
                      href="https://plus.google.com/"
                      rel="nofollow"
                      target="_blank"
                    ></a>
                  </li>
                  <li
                    class="youtube ar1web-tooltip ar1web-tooltip-top"
                    data-ar1web-tooltip="Youtube"
                  >
                    <a
                      href="https://www.youtube.com/"
                      rel="nofollow"
                      target="_blank"
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
            <p>
              {" "}
              <label
                style={{
                  color: "#3bb7ff",
                }}
              >
                {" "}
                Giới Thiệu :{" "}
              </label>{" "}
              Một con người ham học hỏi , đối diện cái khó ,không có từ bỏ cuộc
              trong từ điển của tôi{" "}
            </p>
          </div>
        </div>
        <div className="btn_edit_personel" onClick={() => setModal(true)}>
          <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa trang cá nhân
        </div>
      </div>

      <div className="profile fl">
        <div className="profile_friends fl1">
          <div className="header_profile_friends fl">
            <span style={{ fontWeight: "600", fontSize: "20px" }}>Bạn Bè</span>
            <span>Xem Tất Cả Bạn Bè</span>
          </div>

          <div className="list_friends">
            {friends &&
              friends.length > 0 &&
              friends.map((friend, index) => {
                return (
                  <div key={index}>
                    <UserSmall friend={friend} />
                  </div>
                );
              })}
          </div>

          <h3> Hỉnh Ảnh </h3>
          <div className="profile_image fl">
            {images &&
              images.length > 0 &&
              images.map((item, index) => {
                return (
                  <>
                    <div className="profile_image_item" key={index}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={item}
                        alt=""
                      />
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        <div className="profile_posts fl2">
          <div className="profile_posts_input">
            <InputSearch avatar={profile.avatar} callback={callbackRender} />
          </div>
          <div className="profile_posts_list">
            {posts &&
              posts.length > 0 &&
              posts.map((post, index) => {
                return (
                  <div key={index}>
                    <Post post={post} profile={profile} check={true} />
                  </div>
                );
              })}
            {loading && <> </>}
          </div>
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
            Chỉnh sửa trang cá nhân
          </h3>
          <input
            value={update.username}
            className="w100 edit_personal"
            placeholder="ex. abc"
            onChange={(e) => setUpdate({ ...update, username: e.target.value })}
          />
          <input
            value={update.name}
            className="w100 edit_personal"
            placeholder="ex. nam"
            onChange={(e) => setUpdate({ ...update, name: e.target.value })}
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
              src={update.avatar}
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

export default Profile;

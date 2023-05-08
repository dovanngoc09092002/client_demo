/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import "../css/profile.css";
// import Post from "../component/post";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Post from "../component/post";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ProfileId() {
  const [profile, setProfile] = useState({});
  const { id } = useParams();
  const [isfriend, setIsfriend] = useState({
    accept: false,
    issend: false,
  });
  const nav = useNavigate();
  const [render, setRender] = useState(false);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [endOfData, setEndOfData] = useState(false);
  useEffect(() => {
    axios
      .get(`https://api-ngoc.onrender.com/user/profile/${id}`, {
        withCredentials: true,
      })
      .then((data) => {
        setProfile({ ...data.data.user });
      });

    axios
      .post(
        `https://api-ngoc.onrender.com/friend/checkFriend`,
        { receiverId: parseInt(id) },
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        setIsfriend({
          accept: data.data.accept,
          issend: data.data.issend,
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  useEffect(() => {
    loadPosts();
  }, []);
  function loadPosts() {
    if (loading || endOfData) {
      return;
    }
    setLoading(true);
    axios
      .get(
        `https://api-ngoc.onrender.com/post/posts/getbyuserid?page=${page}&limit=3&id=${id}`,
        {
          withCredentials: true,
        }
      )
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

  const sendRequestFriend = () => {
    axios
      .post(
        `https://api-ngoc.onrender.com/friend/send`,
        { receiverId: parseInt(id) },
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        if (data.data.errCode === 0) {
          toast.success(" Gửi lời mời thành công!", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (data.data.errCode === 1) {
          toast.warn(" Đã có lời mời!", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Gửi lời mời thất bại!", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        setRender(!render);
      });
  };

  const handleRemoveFriend = () => {
    axios
      .post(
        " https://api-ngoc.onrender.com/friend/removeFriend ",
        { idFriend: id },
        { withCredentials: true }
      )
      .then((data) => {
        setRender(!render);
      })
      .catch((err) => {
        console.log("data is", err);
      });
  };

  return (
    <>
      <div className="profile_id_class">
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
                Một con người ham học hỏi , đối diện cái khó ,không có từ bỏ
                cuộc trong từ điển của tôi{" "}
              </p>
            </div>
          </div>
          <div className="fl" style={{ height: "" }}>
            {isfriend.accept === true && isfriend.issend === true ? (
              <div className="banbe"> Bạn bè </div>
            ) : isfriend.accept === false && isfriend.issend === false ? (
              <>
                <div
                  className="banbe"
                  onClick={() => {
                    sendRequestFriend();
                  }}
                >
                  Thêm bạn bè
                </div>
              </>
            ) : (
              <div className="daguiloimoi"> Đã gửi lời mời </div>
            )}
            {/* {console.log(isfriend.accept)} */}
            {isfriend.accept && (
              <div className="fl1" style={{ textAlign: "right" }}>
                <button className="btn_huyketban" onClick={handleRemoveFriend}>
                  {" "}
                  Hủy Kết Bạn{" "}
                </button>
                <button
                  onClick={() => {
                    nav(`/mess/${id}`);
                  }}
                  className="btn_huyketban"
                >
                  {" "}
                  Nhắn Tin{" "}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="profile fl">
          <div className="profile_posts fl2">
            <div className="profile_posts_list">
              {posts &&
                posts.length > 0 &&
                posts.map((post, index) => {
                  return (
                    <div key={index}>
                      <Post post={post} profile={profile} check={false} />
                    </div>
                  );
                })}
              {loading && <> </>}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default ProfileId;

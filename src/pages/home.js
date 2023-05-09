/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router";
import "../css/home.css";
import axios from "axios";
import Post from "../component/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import InputSearch from "../component/inputSearch";
import Loadding from "../component/loadding";
import MakeFriend from "../component/MakeFriend";
function Home() {
  const Navigate = useNavigate();
  const [isLoadding, setIsLoadding] = useState(false);
  const [noneFriends, setNoneFriends] = useState([]);
  const [page, setPage] = useState(1);
  const [arrVideo, setArrVideo] = useState([]);
  const [arrVideo2, setArrVideo2] = useState([]);
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [endOfData, setEndOfData] = useState(false);
  const [render, setRender] = useState(false);
  function loadPosts() {
    if (loading || endOfData) {
      return;
    }
    axios
      .get(
        `https://api-ngoc.onrender.com/post/posts/home?limit=5&page=${page}`,
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
  const callbackRender = (newpost) => {
    window.location.reload();
    setIsLoadding(true);
  };
  useEffect(() => {
    loadPosts();
  }, []);

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
  useEffect(() => {
    axios
      .get("https://api-ngoc.onrender.com/user/profilebyjwt", {
        withCredentials: true,
      })
      .then((data) => {
        setProfile({ ...data.data.user });
      });

    axios
      .get(`https://api-ngoc.onrender.com/video/get?page=1&limit=5`, {
        withCredentials: true,
      })
      .then((data) => {
        setArrVideo([...data.data.results]);
      });

    axios
      .get(`https://api-ngoc.onrender.com/video/get?page=2&limit=5`, {
        withCredentials: true,
      })
      .then((data) => {
        setArrVideo2([...data.data.results]);
      });
  }, []);

  const handleViewVideo = (id) => {
    Navigate(`/view/video/${id}`);
  };
  useEffect(() => {
    axios
      .get("https://api-ngoc.onrender.com/friend/nonefriends", {
        withCredentials: true,
      })
      .then((data) => {
        console.log("this is data" , data);
        setNoneFriends([...data.data.noneFriends]);
      });
  }, [render]);
  const callback = () => {
    setRender(!render);
  };
  return (
    <>
      <>
        {isLoadding && <Loadding />}
        <div className="videotin">
          <Swiper
            pagination={{
              type: "progressbar",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
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
                {arrVideo &&
                  arrVideo.length > 0 &&
                  arrVideo.map((item, index) => {
                    return (
                      <>
                        <div
                          className="videotin_item"
                          onClick={() => {
                            handleViewVideo(item.id);
                          }}
                          style={{ width: "16.6%" }}
                        >
                          <img
                            className="avatarInVideoItem"
                            alt=""
                            src={item.user.avatar}
                          />
                          <img
                            className="videotin_item_img videotin_item_img_sub"
                            style={{ width: "100%" }}
                            alt=""
                            src={item.image}
                          />
                          <div className="videotin_item_footer videotin_item_footer_sub">
                            @{item.user.username}
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </SwiperSlide>
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
                {arrVideo2 &&
                  arrVideo2.length > 0 &&
                  arrVideo2.map((item, index) => {
                    return (
                      <>
                        <div
                          className="videotin_item"
                          onClick={() => {
                            handleViewVideo(item.id);
                          }}
                          style={{ width: "16.6%" }}
                        >
                          <img
                            className="avatarInVideoItem"
                            alt=""
                            src={item.user.avatar}
                          />
                          <img
                            className="videotin_item_img videotin_item_img_sub"
                            style={{ width: "100%" }}
                            alt=""
                            src={item.image}
                          />
                          <div className="videotin_item_footer videotin_item_footer_sub">
                            @{item.user.username}
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="homepage fl">
          <div className="homepage_post fl2">
            <div className="homepage_post_video fl">
              <div className="search_inhome">
                <InputSearch
                  avatar={profile.avatar}
                  callback={callbackRender}
                />
              </div>
            </div>
            <div className="profile_posts_list">
              {posts &&
                posts.length > 0 &&
                posts.map((post, index) => {
                  return (
                    <div key={index}>
                      <Post post={post} profile={post.user} check={false} />
                    </div>
                  );
                })}
              {loading && <> </>}
            </div>
          </div>
          <div className="homepage_suggest fl1 abc_sticky">
            <button
              className="btn_tincuaban"
              onClick={() => {
                Navigate("/videome");
              }}
            >
              Xem Tin Của Bạn
            </button>
            {/* <h3
              style={{
                padding: "10px 5px",
                fontWeight: "600",
                color: "#4267b2",
              }}
            >
             
              Gợi ý kết bạn
            </h3> */}

            {noneFriends &&
              noneFriends.length > 0 &&
              noneFriends.map((item, index) => {
                return (
                  <div key={index}>
                    <MakeFriend item={item} callback={callback} />
                  </div>
                );
              })}
          </div>
        </div>
      </>
    </>
  );
}

export default Home;

/* eslint-disable react-hooks/exhaustive-deps */
import "../css/messages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faImage,
  faInfoCircle,
  faRightLong,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import UserSmall from "../component/user_small";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import BoxMess from "../component/boxmess";
const ENDPOINT = "https://api-ngoc.onrender.com";
function Message() {
  const messageContainerRef = useRef(null);
  const [render, setRender] = useState(false);
  const [friends, setFriends] = useState([]);
  const [profile, setProfile] = useState({});
  const { id } = useParams();
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState({
    receiverId: id,
    content: "",
  });
  useEffect(() => {
    setMessage({ ...message, receiverId: id });
  }, [id]);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const getFullMess = () => {
    axios
      .get(`https://api-ngoc.onrender.com/mess/get?receiverId=${id}`, {
        withCredentials: true,
      })
      .then((data) => {
        setMessages([...data.data.data]);
      });
  };

  useEffect(() => {
    axios
      .get("https://api-ngoc.onrender.com/friend/friends", {
        withCredentials: true,
      })
      .then((data) => {
        if (data.data.errCode === 0) {
          setFriends([...data.data.friendsById]);
        }
      });

    getFullMess();
  }, [id]);
  useEffect(() => {
    axios
      .get(`https://api-ngoc.onrender.com/user/profile/${id}`, {
        withCredentials: true,
      })
      .then((data) => {
        setProfile({ ...data.data.user });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);
  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT, { withCredentials: true });
    setSocket(newSocket);
    newSocket.emit("joinRoom", { receiverId: id });
    // Lắng nghe sự kiện "newComment" từ server
    newSocket.on("newMess", (newMess) => {
      getFullMess();
    });
    return () => {
      newSocket.disconnect();
    };
  }, [id]);
  useEffect(() => {
    const messageContainer = messageContainerRef.current;
    const lastMessage = messageContainer.lastElementChild;
    lastMessage && lastMessage.scrollIntoView();
  }, [messages]);
  const createMess = () => {
    socket.emit("newMess", message);
    setMessage({ ...message, content: "" });
  };
  return (
    <>
      <div className="mess fl">
        <div className="mess_friend fl1">
          <div className="mess_friend_header fl">
            <FontAwesomeIcon
              style={{ width: "10%", fontSize: "20px", color: "#3bb7ff" }}
              icon={faSearch}
            />
            <input
              className="mess_friend_input"
              placeholder="Tìm kiếm bạn bè"
            />
          </div>
          <div className="mess_friend_body">
            <div className="mess_friend_item">
              {friends &&
                friends.length > 0 &&
                friends.map((friend, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setRender(!render);
                        navigate(`/mess/${friend.id}`);
                      }}
                    >
                      <UserSmall friend={friend} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="mess_body fl2">
          <div className="mess_body_header fl">
            <img
              alt=""
              src={profile.avatar}
              className="mess_body_header_avatar"
            />
            <span className="mess_body_header_name fl1">
              {profile.name} @{profile.username}
            </span>
            <div className="mess_body_header_infor fl2">
              <FontAwesomeIcon icon={faInfoCircle} />
            </div>
          </div>
          <div className="mess_body_content" ref={messageContainerRef}>
            {messages &&
              messages.length > 0 &&
              messages.map((message, index) => {
                if (message.usersender.id === parseInt(id)) {
                  return (
                    <>
                      <BoxMess check={true} message={message} />
                    </>
                  );
                } else {
                  return (
                    <>
                      <BoxMess check={false} message={message} />
                    </>
                  );
                }
              })}
          </div>
          <div className="mess_body_footer fl">
            <FontAwesomeIcon icon={faImage} className="fl1" />
            <input
              placeholder="Aa"
              value={message.content}
              className="fl4 mess_body_footer_input"
              onChange={(e) => {
                setMessage({ ...message, content: e.target.value });
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  createMess();
                }
              }}
            />
            <div className="fl1">
              <FontAwesomeIcon
                style={{ marginLeft: "10px" }}
                icon={faRightLong}
              />{" "}
            </div>
          </div>
        </div>
        <div className="mess_infor fl1">
          <img
            alt=" "
            src={profile.avatar}
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
          <div
            className="mess_infor_trangcanhan"
            onClick={() => {
              navigate(`/profile/${profile.id}`);
            }}
          >
            <FontAwesomeIcon icon={faHome} /> <span>Trang cá nhân</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Message;

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Post from "../component/post";
import "../css/postcmt.css";
import { getPostByidpost } from "../api";
import { useParams } from "react-router-dom";
import axios from "axios";
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://api-ngoc.onrender.com";

function PostCMT() {
  const [post, setPost] = useState({});
  const [profile, setProfile] = useState({});
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    getPostByidpost(id).then((data) => {
      if (data.data.errCode === 0) {
        setPost({ ...data.data.data });
        setProfile({ ...data.data.data.user });
      }
    });
    getFullCmt();
  }, []);
  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT, { withCredentials: true });
    setSocket(newSocket);

    // Lắng nghe sự kiện "newComment" từ server
    newSocket.on("newComment", (newComment) => {
      getFullCmt();
    });
    return () => newSocket.disconnect();
  }, []);

  const getFullCmt = () => {
    axios
      .get(`https://api-ngoc.onrender.com/comment/getbyidpost/${id}`, {
        withCredentials: true,
      })
      .then((data) => {
        setComments([...data.data.data]);
      });
  };

  const [comment, setComment] = useState({
    PostId: id,
    CommentBody: "",
  });
  const createComment = () => {
    if (!comment.CommentBody) {
      alert("bạn cần điền mới có thể nhận xét");
      return;
    }
    socket.emit("newComment", comment);
    setComment({
      ...comment,
      CommentBody: "",
    });
  };

  return (
    <div className="fl POSTCOMMENT">
      <div className="post_content fl1">
        {post && profile && (
          <Post post={post} profile={profile} check={false} />
        )}
      </div>
      <div className="post_comment post_comment_height fl1 ">
        <div className="fl">
          <img
            style={{ width: "60px", height: "60px" }}
            alt=" "
            src={profile.avatar}
          />
          <input
            className="post_comment_input"
            value={comment.CommentBody}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                createComment();
              }
            }}
            onChange={(e) => {
              setComment({ ...comment, CommentBody: e.target.value });
            }}
          />
        </div>
        <div className="contentInComments">
          {comments &&
            comments.length > 0 &&
            comments.map((cmt, index) => {
              return (
                <>
                  <div className="post_comment_content fl " key={index}>
                    <div className="post_comment_img">
                      <img
                        className="post_comment_img_img"
                        alt=""
                        src={cmt.user.avatar}
                      />
                    </div>
                    <div className="post_comment_comment fl1">
                      {cmt.commentBody}
                      <span className="nameforcmt"> @{cmt.user.name} </span>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default PostCMT;

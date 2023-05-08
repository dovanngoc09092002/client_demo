import { useNavigate } from "react-router";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MakeFriend({ item, callback }) {
  const Navigate = useNavigate();

  const handleClickToProfile = (id) => {
    Navigate(`/profile/${id}`);
  };
  const handleClickSendRequest = () => {
    axios
      .post(
        "https://api-ngoc.onrender.com/friend/send",
        { receiverId: item.id },
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        console.log("this is data", data);

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
          toast.warn("Đã gửi lời mời!", {
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

        callback();
      });
  };

  return (
    <>
      <div id="fb">
        <div id="fb-top">
          <p>
            <b>Gợi Ý Kết Bạn</b>
            <span>Tìm Kiếm Bạn Bè &bull; Cài Đặt</span>
          </p>
        </div>
        <Tippy placement="left" content="Trang Cá Nhân">
          <img
            src={item.avatar}
            height="100"
            width="100"
            alt=""
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleClickToProfile(item.id);
            }}
          />
        </Tippy>
        <p id="info">
          {item.name} <span> @{item.username} </span>
        </p>
        <div id="button-block">
          <div
            onClick={() => {
              handleClickSendRequest();
            }}
            id="confirm"
          >
            Thêm Bạn Bè
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

export default MakeFriend;

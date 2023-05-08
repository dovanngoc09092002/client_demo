import { acceptMakeFriend } from "../api";
import "../css/fb.css";

function Fb(props) {


  const handleClickAccept = (id) => {
  
    acceptMakeFriend({ id: id }).then((data) => {
      if (data.data.errCode === 0) {
        props.parentCallback();
      }
    });
  };
  return (
    <>
      <div id="fb">
        <div id="fb-top">
          <p>
            <b>Lời mời kết bạn</b>
            <span>
              Có phải bạn của bạn &bull; @{props.user.sender.username}
            </span>
          </p>
        </div>
        <img src={props.user.sender.avatar} height="100" width="100" alt="" />
        <p id="info">
          <b>{props.user.sender.name}</b>
        </p>
        <div id="button-block">
          <div id="confirm" onClick={() => handleClickAccept(props.user.id)}>
            Chấp nhận
          </div>
          <div id="delete">Hủy bỏ</div>
        </div>
      </div>
    </>
  );
}

export default Fb;

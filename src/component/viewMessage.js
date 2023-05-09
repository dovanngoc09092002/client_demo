import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/viewmess.css";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useNavigate } from "react-router";
function ViewMessage({ mess, check }) {
  const Navigate = useNavigate();
  const handleClickMess = (id) => {
    Navigate(`/mess/${id}`);
  };
  return (
    <div className="viewlateMess fl">
      <Tippy placement="left" content="Nhắn Tin">
        <img
          alt=""
          src={check ? mess.userreceiver.avatar : mess.usersender.avatar}
          style={{ width: "60px", height: "60px" }}
          onClick={() => {
            handleClickMess(check ? mess.userreceiver.id : mess.usersender.id);
          }}
        />
      </Tippy>
      <div className="viewlateMess_content fl1">
        <div className="viewlateMess_content_name">
          {check ? mess.userreceiver.name : mess.usersender.name}
        </div>
        <div className="viewlateMess_content_text fl">
          <div className="fl1">
            {check ? "Bạn :" : mess.usersender.name + " :"} {mess.content.slice(0, 8)}...{" "}
          </div>
          <FontAwesomeIcon style={{ paddingLeft: "50px" }} icon={faUserGroup} />
        </div>
      </div>
    </div>
  );
}

export default ViewMessage;

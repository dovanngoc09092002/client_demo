import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/user_small.css"
import { useNavigate } from "react-router";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
function UserSmall( props ) {
  const nav = useNavigate()
  console.log("this is props", props.friend.id);
  const handleProfile = () =>{
    nav(`/profile/${props.friend.id}`);
  }
  return (
    <>
      <Tippy
        content="Trang cá nhân"
        placement="left"
        zIndex={908231094840324}
      >
        <div className="user_small fl " onClick={handleProfile}>
          <img className="user_small_avt" src={props.friend.avatar} alt="" />
          <span className="user_small_name">
            {props.friend.name} {console.log("props", props)}
            <div
              className="user_small_isactive"
              style={{ background: props.friend.isactive ? "green" : "#666" }}
            >
              {" "}
            </div>
          </span>
          <div className="fl1" style={{ textAlign: "right" }}>
            <FontAwesomeIcon
              style={{ marginRight: "10px" }}
              icon={faUserGroup}
            />
          </div>
        </div>
      </Tippy>
    </>
  );
}

export default UserSmall;

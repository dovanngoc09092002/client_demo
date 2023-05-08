import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/user_small.css"
import { useNavigate } from "react-router";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
function UserSmall( props ) {
  const nav = useNavigate()
  console.log("this is props", props.friend.id);
  const handleProfile = () =>{
    nav(`/profile/${props.friend.id}`);
  }
  return (
    <>
      <div className="user_small fl " onClick={handleProfile}>
        <img className="user_small_avt" src={props.friend.avatar} alt="" />
        <span className="user_small_name">
          {props.friend.name} {console.log("props", props)}
          <div
            className="user_small_isactive"
            style={{ background: props.friend.isactive ? 'green' : '#666' }}
          >
            {" "}
          </div>
        </span>
        <div className="fl1" style={{ textAlign: "right" }}>
          <FontAwesomeIcon style={{ marginRight: "10px" }} icon={faUserGroup} />
        </div>
      </div>
    </>
  );
}

export default UserSmall;

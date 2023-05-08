import "../css/itemsearch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

function ItemSearch({ user, close }) {
  const Navigate = useNavigate();
 
  const handleClickSearch = (id) => {
    window.location.href=`/profile/${id}`;
    
    close();
  };
  return (
    <div  className="itemSearch fl" onClick={() => handleClickSearch(user.id)}>
      <img
        style={{
          width: "65px",
          height: "65px",
          borderRadius: "50%",
        }}
        alt=""
        src={user.avatar}
      />
      <div style={{ marginLeft: "10px" }}>
        <p>{user.name}</p>

        <p>@{user.username}</p>
      </div>
      <FontAwesomeIcon
        className="fl1"
        style={{
          fontSize: "20px",
          color: "#0676c9",
          padding: "0px 10px",
          textAlign: "right",
        }}
        icon={faSearch}
      ></FontAwesomeIcon>
    </div>
  );
}

export default ItemSearch;

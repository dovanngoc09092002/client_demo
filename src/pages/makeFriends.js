/* eslint-disable react-hooks/exhaustive-deps */
import "../css/makefriends.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Fb from "../component/fb";
import { useEffect, useState } from "react";

import { getListMakeFriend } from "../redux/actions";
function MakeFriends() {
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);
  useEffect(() => {
    dispatch(getListMakeFriend.getListMakeFriendRequest());
  }, [render]);
  let listPending = useSelector((state) => state.getMakeFriends.Data);
  const callbackFunction = () => {
    setRender(!render);
  };

  return (
    <>
     <h3 style={{ paddingTop : '20px' }}>
          Bạn có <span> {listPending.length} </span> lời mời kết bạn{" "}
        </h3>
    <div className="fl makefriend">
      <div className="makefriend_list fl1">
       
        {listPending &&
          listPending.length > 0 &&
          listPending.map((item, index) => {
            return (
              <div key={index}>
                <Fb user={item} parentCallback={callbackFunction} />
              </div>
            );
          })}
       
      </div>
      <div className="makefriend_img fl1"></div>
    </div>
    </>
  );
}
export default MakeFriends;

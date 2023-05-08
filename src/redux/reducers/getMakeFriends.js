import { INIT_STATE } from "../../initState";
export default function getFullFriendRequest(
  state = INIT_STATE.ListMakeFriends,
  action
) {
  switch (action.type) {
    case "getListMakeFriendRequest":
      return {
        ...state,
      };
    case "getListMakeFriendSuccess":
      return {
        ...state,
        Data: action.payload,
      };
    case "getListMakeFriendFail":
      return {
        ...state,
      };

    default:
      return state;
  }
}




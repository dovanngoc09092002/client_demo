import { createActions } from "redux-actions";

export const getListMakeFriend = createActions({
  getListMakeFriendRequest: (payload) => payload,
  getListMakeFriendSuccess: (payload) => payload,
  getListMakeFriendFail: (err) => err,
});


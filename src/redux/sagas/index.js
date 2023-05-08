import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";

function* getFullListMakeFriendsActionSaga(action) {
  try {
    const data = yield call(api.getFullFriendRequest, action.payload);

    yield put(
      actions.getListMakeFriend.getListMakeFriendSuccess(
        data.data.friendrequests
      )
    );
  } catch (err) {
    actions.getListMakeFriend.getPostByJwtFail(err);
  }
}

function* mySaga() {
  yield takeLatest(
    actions.getListMakeFriend.getListMakeFriendRequest,
    getFullListMakeFriendsActionSaga
  );
}
export default mySaga;

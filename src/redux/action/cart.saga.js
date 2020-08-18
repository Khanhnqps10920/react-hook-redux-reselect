import { all, call, put, takeLatest } from 'redux-saga/effects';

import { clearCart } from './cart';

import actionType from './actionType';

export function* clearCartOnSignout() {
  yield put(clearCart());
}

export function* onSignoutSuccess() {
  yield takeLatest(actionType.SIGN_OUT_SUCCESS, clearCartOnSignout);
}

export function* cartSaga() {
  yield all([call(onSignoutSuccess)]);
}

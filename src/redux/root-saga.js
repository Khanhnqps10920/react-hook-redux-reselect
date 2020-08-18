import { all, call } from 'redux-saga/effects';

import { shopSaga } from './action/shop.saga';
import { userSaga } from './action/user.saga';
import { cartSaga } from './action/cart.saga';

export default function* rootSaga() {
  yield all([call(shopSaga), call(userSaga), call(cartSaga)]);
}

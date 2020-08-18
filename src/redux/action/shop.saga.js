import { takeLatest, call, all, put } from 'redux-saga/effects';
import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';
import { fetchCollectionSuccess, fetchCollectionFail } from './shop';
import actionType from './actionType';

export function* fetchCollectionAsync() {
  console.log('fired');

  try {
    const collectionRef = firestore.collection('collections');

    const snapshot = yield collectionRef.get();

    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionSuccess(collectionsMap));
  } catch (e) {
    yield put(fetchCollectionFail(e.message));
  }
  // collectionRef
  //   .get()
  //   .then(snapshot => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //     console.log(collectionsMap);
  //     dispatch(fetchCollectionSuccess(collectionsMap));
  //   })
  //   .catch(e => dispatch(fetchCollectionFail(e)));
}

export function* fetchCollectionStart() {
  yield takeLatest(actionType.FETCH_COLLECTION_START, fetchCollectionAsync);
}

export function* shopSaga() {
  yield all([call(fetchCollectionStart)]);
}

import actionType from './actionType';
import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: actionType.FETCH_COLLECTION_START
});

export const fetchCollectionSuccess = payload => ({
  type: actionType.FETCH_COLLECTION_SUCCESS,
  payload
});

export const fetchCollectionFail = payload => ({
  type: actionType.FETCH_COLLECTION_FAIL,
  payload
});

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('collections');

    dispatch(fetchCollectionsStart());

    collectionRef
      .get()
      .then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        console.log(collectionsMap);
        dispatch(fetchCollectionSuccess(collectionsMap));
      })
      .catch(e => dispatch(fetchCollectionFail(e)));
  };
};

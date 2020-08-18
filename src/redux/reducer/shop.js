import actionType from '../action/actionType';

const INITIAL_STATE = {
  shopData: {},
  isFetching: false,
  errorMess: ''
};

const shop = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionType.FETCH_COLLECTION_START: {
      return { ...state, isFetching: true };
    }

    case actionType.FETCH_COLLECTION_SUCCESS: {
      return { ...state, shopData: payload, isFetching: false };
    }

    case actionType.FETCH_COLLECTION_FAIL: {
      return { ...state, isFetching: false, errorMess: payload };
    }

    case actionType.UPDATE_COLLECTION:
      return { ...state, shopData: payload };

    default:
      return state;
  }
};

export default shop;

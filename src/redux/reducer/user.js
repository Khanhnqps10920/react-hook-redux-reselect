import actionType from '../action/actionType';

const INITIAL_STATE = {
  currentUser: null,
  error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionType.SIGN_IN_SUCCESS: {
      return { ...state, currentUser: payload, error: null };
    }

    case actionType.SIGN_OUT_SUCCESS: {
      return { ...state, currentUser: null, error: null };
    }

    case actionType.SIGN_IN_FAIL:
    case actionType.SIGN_OUT_FAIL:
    case actionType.SIGN_UP_FAIL: {
      return { ...state, error: payload };
    }

    default:
      return state;
  }
};

export default userReducer;

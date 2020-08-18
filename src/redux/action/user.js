import actionType from './actionType';

export const setCurrentUser = user => ({
  type: actionType.SET_CURRENT_USER,
  payload: user
});

export const googleSigninStart = () => ({
  type: actionType.GOOGLE_SIGN_IN_START
});

export const signinFail = error => ({
  type: actionType.SIGN_IN_FAIL,
  payload: error
});

export const emailSigninStart = emailAndPassword => ({
  type: actionType.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
});

export const signinSuccess = user => ({
  type: actionType.SIGN_IN_SUCCESS,
  payload: user
});

export const checkUserSession = () => ({
  type: actionType.CHECK_USER_SESSION
});

export const signoutStart = () => ({
  type: actionType.SIGN_OUT_START
});

export const signoutSuccess = () => ({
  type: actionType.SIGN_OUT_SUCCESS
});

export const signoutFail = e => ({
  type: actionType.SIGN_OUT_FAIL,
  payload: e
});

export const signUpStart = userCredentials => ({
  type: actionType.SIGN_UP_START,
  payload: userCredentials
});

export const signUpSuccess = ({ userAuth, additionalData }) => ({
  type: actionType.SIGN_UP_SUCCESS,
  payload: { userAuth, additionalData }
});

export const signUpFail = e => ({
  type: actionType.SIGN_UP_FAIL,
  payload: e
});

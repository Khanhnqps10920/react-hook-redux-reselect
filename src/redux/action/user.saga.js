import { takeLatest, put, all, call } from 'redux-saga/effects';
import actionType from './actionType';
import {
  signinSuccess,
  signinFail,
  signoutSuccess,
  signoutFail,
  signUpSuccess,
  signUpFail
} from './user';
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser
} from '../../firebase/firebase.utils';

function* signinWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);

    const userRef = yield call(createUserProfileDocument, user);

    const userSnapshot = yield userRef.get();

    yield put(signinSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (e) {
    yield put(signinFail(e.message));
  }
}

export function* signinWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);

    const userRef = yield call(createUserProfileDocument, user);

    const userSnapshot = yield userRef.get();

    yield put(signinSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (e) {
    yield put(signinFail(e.message));
  }
}

export function* isUserAuthenticated() {
  try {
    const user = yield getCurrentUser();

    if (!user) return;

    const userRef = yield call(createUserProfileDocument, user);

    const userSnapshot = yield userRef.get();

    yield put(signinSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (e) {
    yield put(signinFail(e.message));
  }
}

export function* userSignout() {
  try {
    yield auth.signOut();

    yield put(signoutSuccess());
  } catch (e) {
    yield put(signoutFail(e.message));
  }
}

export function* userSignUp(userCredentials) {
  console.log(userCredentials);

  const {
    payload: { email, password, displayName }
  } = userCredentials;

  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    console.log(user);
    yield put(
      signUpSuccess({ userAuth: { user }, additionalData: { displayName } })
    );
  } catch (e) {
    console.log(e);
    yield put(signUpFail(e));
  }
}

export function* signInAfterSignUp(userCredentials) {
  console.log(userCredentials.payload);

  const {
    payload: {
      userAuth: { user },
      additionalData: { displayName }
    }
  } = userCredentials;

  try {
    const userRef = yield call(createUserProfileDocument, user, displayName);

    const userSnapshot = yield userRef.get();

    yield put(signinSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (e) {
    console.log(e);
    yield put(signinFail(e.message));
  }
}

export function* onGoogleSigninStart() {
  yield takeLatest(actionType.GOOGLE_SIGN_IN_START, signinWithGoogle);
}

export function* onEmailSiginStart() {
  yield takeLatest(actionType.EMAIL_SIGN_IN_START, signinWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(actionType.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignoutStart() {
  yield takeLatest(actionType.SIGN_OUT_START, userSignout);
}

export function* onSignUpStart() {
  yield takeLatest(actionType.SIGN_UP_START, userSignUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(actionType.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSaga() {
  yield all([
    call(onGoogleSigninStart),
    call(onEmailSiginStart),
    call(onCheckUserSession),
    call(onSignoutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ]);
}

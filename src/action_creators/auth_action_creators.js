import Firebase from 'firebase';
import {browserHistory} from 'react-router';


export function openLoginPopup() {
  return {
    type: 'OPEN_LOGIN_POPUP'
  };
}

export function authWithPopup() {
  return (dispatch, getState)=> {
    dispatch(openLoginPopup());

    const provider = new Firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    Firebase.auth().signInWithPopup(provider)
            .then((result) => {
              dispatch(loginSucceed(result.user.providerData[0], result.credential.accessToken));
            }).then(()=> {
              browserHistory.push('/main');
            })
            .catch((error)=> {
              throw error;
              //dispatch(loginError(error));
            });
  };
}

export function loginError(error) {
  return {
    type: 'LOGIN_ERROR',
    error
  };
}

export function loginSucceed(user, token) {
  return {
    type: 'LOGIN_SUCCEED',
    user,
    token
  };
}

export function logout() {
  return (dispatch, getState) => {
    Firebase.auth().signOut().then(()=> {
      dispatch(redirectToLogin());

      dispatch({
        type: 'LOGOUT_SUCCEED'
      });
    }, function (error) {
      throw(error);
    });
  };
}

export function redirectToLogin() {
  return (dispatch, getState) => {
    browserHistory.push('/');
    dispatch({
      type: 'REDIRECT_TO_LOGIN_SUCCEED'
    });
  };
}

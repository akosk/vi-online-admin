import initialState from '../initialState';

export default function auth(state = initialState.auth, action) {
  switch (action.type) {
    case 'OPEN_LOGIN_POPUP':
      return {
        ...state,
        popupOpened: true,
      };

    case 'LOGIN_ERROR':
      return {
        ...state,
        popupOpened: false,
        error: action.error,
      };

    case 'LOGIN_SUCCEED':
      return {
        ...state,
        user: action.user,
        token: action.token,
        popupOpened: false,
      };

    case 'LOGOUT_SUCCEED':
      return {
        ...initialState,
      };

    default:
      return state;
  }
}

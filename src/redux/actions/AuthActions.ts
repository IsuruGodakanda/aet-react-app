import moment from 'moment';
import { Dispatch } from 'redux';
import { SessionKey, getSession, removeSession } from 'Services/securityService';
import { decodeJWT } from 'Utils/commonUtil';

import { AuthDispatchTypes, SET_AUTH_FAIL, SET_AUTH_USER } from '../types/AuthActionTypes';

// Validate JWT
export const validateJWT = () => (dispatch: Dispatch<AuthDispatchTypes>): boolean => {
  let validate = false;
  try {
    const token = getSession(SessionKey.AUTH_TOKEN);
    if (!(token && moment.unix(decodeJWT(token).exp).isAfter(moment()))) {
      removeSession([SessionKey.AUTH_TOKEN]);

      dispatch({
        type: SET_AUTH_USER,
        payload: null,
      });
    } else {
      dispatch({
        type: SET_AUTH_USER,
        payload: decodeJWT(token),
      });
      validate = true;
    }
  } catch (err) {
    dispatch({
      type: SET_AUTH_FAIL,
    });
  }

  return validate;
};

// Login user action
export const setAuthUser = () => (dispatch: Dispatch<AuthDispatchTypes>): void => {
  try {
    const authToken = getSession(SessionKey.AUTH_TOKEN);
    dispatch({
      type: SET_AUTH_USER,
      payload: decodeJWT(authToken),
    });
  } catch (err) {
    dispatch({
      type: SET_AUTH_FAIL,
    });
  }
};

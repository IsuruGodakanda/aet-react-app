import { isEmpty } from 'lodash-es';

import { AuthDispatchTypes, AuthUserType, SET_AUTH_FAIL, SET_AUTH_USER } from '../types/AuthActionTypes';

interface IDefaultState {
  isAuthenticated: boolean;
  authUser?: AuthUserType;
}

const defaultState: IDefaultState = {
  isAuthenticated: false,
  authUser: null,
};

const authReducer = (state: IDefaultState = defaultState, action: AuthDispatchTypes): IDefaultState => {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        isAuthenticated: isEmpty(action.payload),
        authUser: action.payload,
      };
    case SET_AUTH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;

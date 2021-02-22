/* ## Auth Action Types ## */

// Set Auth User
export const SET_AUTH_FAIL = 'SET_AUTH_FAIL';
export const SET_AUTH_USER = 'SET_AUTH_USER';

export type AuthUserType = {
  id: string;
  email: string;
  role: string;
  avatar: string;
  iat: number;
  exp: number;
} | null;

export interface SetAuthFail {
  type: typeof SET_AUTH_FAIL;
}

export interface SetAuthUser {
  type: typeof SET_AUTH_USER;
  payload: AuthUserType;
}

export type AuthDispatchTypes = SetAuthFail | SetAuthUser;

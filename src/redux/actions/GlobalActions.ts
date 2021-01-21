import { Dispatch } from 'redux';

import { GlobalDispatchTypes, SET_LOADER_STATUS } from '../types/GlobalActionTypes';

// Set loader status
export const setLoaderStatus = (loaderStatus: boolean) => (dispatch: Dispatch<GlobalDispatchTypes>): void => {
  try {
    dispatch({
      type: SET_LOADER_STATUS,
      payload: loaderStatus,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// Set test status
export const test = () => (dispatch: Dispatch<GlobalDispatchTypes>): void => {};

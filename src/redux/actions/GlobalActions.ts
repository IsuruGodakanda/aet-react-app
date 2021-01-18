import { Dispatch } from 'redux';

import { GlobalDispatchTypes, SET_LOADER_STATUS, SET_MODAL_STATUS } from '../types/GlobalActionTypes';

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

// Set modal status
export const setModalStatus = (modalStatus: boolean) => (dispatch: Dispatch<GlobalDispatchTypes>): void => {
  try {
    dispatch({
      type: SET_MODAL_STATUS,
      payload: modalStatus,
    });
  } catch (error) {
    throw new Error(error);
  }
};

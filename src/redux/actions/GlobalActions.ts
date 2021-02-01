import { Dispatch } from 'redux';

import {
  GlobalDispatchTypes,
  SET_LOADER_STATUS,
  SET_OPEN_MODAL,
  REMOVE_OPEN_MODAL,
  SET_SITE_LANG,
} from '../types/GlobalActionTypes';

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

// Set open modal name
export const setOpenModal = (modalName: string) => (dispatch: Dispatch<GlobalDispatchTypes>): void => {
  try {
    dispatch({
      type: SET_OPEN_MODAL,
      payload: modalName,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// Remove open modal name
export const removeOpenModal = () => (dispatch: Dispatch<GlobalDispatchTypes>): void => {
  try {
    dispatch({
      type: REMOVE_OPEN_MODAL,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// Set Site Language
export const setLanguage = (lang: string) => (dispatch: Dispatch<GlobalDispatchTypes>): void => {
  try {
    dispatch({
      type: SET_SITE_LANG,
      payload: lang,
    });
  } catch (error) {
    throw new Error(error);
  }
};

/* ## Global Action Types ## */

// Set Loader Status
export const SET_LOADER_STATUS = 'SET_LOADER_STATUS';

export interface SetLoaderStatus {
  type: typeof SET_LOADER_STATUS;
  payload: boolean;
}

// Set Modal Status
export const SET_MODAL_STATUS = 'SET_MODAL_STATUS';

export interface SetModalStatus {
  type: typeof SET_MODAL_STATUS;
  payload: boolean;
}

export type GlobalDispatchTypes = SetLoaderStatus | SetModalStatus;

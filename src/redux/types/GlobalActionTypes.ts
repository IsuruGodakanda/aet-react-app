/* ## Global Action Types ## */

// Set Loader Status
export const SET_LOADER_STATUS = 'SET_LOADER_STATUS';

export interface SetLoaderStatus {
  type: typeof SET_LOADER_STATUS;
  payload: boolean;
}

export type GlobalDispatchTypes = SetLoaderStatus;

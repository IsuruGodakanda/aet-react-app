/* ## Global Action Types ## */

// Set Loader Status
export const SET_LOADER_STATUS = 'SET_LOADER_STATUS';

export interface SetLoaderStatus {
  type: typeof SET_LOADER_STATUS;
  payload: boolean;
}

// Set Modal
export const SET_OPEN_MODAL = 'SET_OPEN_MODAL';
export const REMOVE_OPEN_MODAL = 'REMOVE_OPEN_MODAL';

export interface SetOpenModal {
  type: typeof SET_OPEN_MODAL;
  payload: string;
}

export interface RemoveOpenModal {
  type: typeof REMOVE_OPEN_MODAL;
}

// Set Language
export const SET_SITE_LANG = 'SET_SITE_LANG';

export interface SetSiteLanguage {
  type: typeof SET_SITE_LANG;
  payload: string;
}

export type GlobalDispatchTypes = SetLoaderStatus | SetOpenModal | RemoveOpenModal | SetSiteLanguage;

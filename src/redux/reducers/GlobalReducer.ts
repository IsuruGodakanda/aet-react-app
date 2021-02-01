import {
  GlobalDispatchTypes,
  SET_LOADER_STATUS,
  SET_OPEN_MODAL,
  REMOVE_OPEN_MODAL,
  SET_SITE_LANG,
} from '../types/GlobalActionTypes';

interface IDefaultState {
  loading: boolean;
  openModal: string;
  lang: string;
}

const defaultState: IDefaultState = {
  loading: false,
  openModal: '',
  lang: 'en',
};

const globalReducer = (state: IDefaultState = defaultState, action: GlobalDispatchTypes): IDefaultState => {
  switch (action.type) {
    case SET_LOADER_STATUS:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_OPEN_MODAL:
      return {
        ...state,
        openModal: action.payload,
      };
    case REMOVE_OPEN_MODAL:
      return {
        ...state,
        openModal: '',
      };
    case SET_SITE_LANG:
      return {
        ...state,
        lang: action.payload,
      };
    default:
      return state;
  }
};

export default globalReducer;

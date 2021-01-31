import { GlobalDispatchTypes, SET_LOADER_STATUS, SET_OPEN_MODAL, REMOVE_OPEN_MODAL } from '../types/GlobalActionTypes';

interface IDefaultState {
  loading: boolean;
  openModal: string;
}

const defaultState: IDefaultState = {
  loading: false,
  openModal: '',
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
    default:
      return state;
  }
};

export default globalReducer;

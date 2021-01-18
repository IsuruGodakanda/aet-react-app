import { GlobalDispatchTypes, SET_LOADER_STATUS, SET_MODAL_STATUS } from '../types/GlobalActionTypes';

interface IDefaultState {
  loading: boolean;
  isModalOpen: boolean;
}

const defaultState: IDefaultState = {
  loading: false,
  isModalOpen: false,
};

const globalReducer = (state: IDefaultState = defaultState, action: GlobalDispatchTypes): IDefaultState => {
  switch (action.type) {
    case SET_LOADER_STATUS:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_MODAL_STATUS:
      return {
        ...state,
        isModalOpen: action.payload,
      };
    default:
      return state;
  }
};

export default globalReducer;

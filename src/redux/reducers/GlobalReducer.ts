import { GlobalDispatchTypes, SET_LOADER_STATUS } from '../types/GlobalActionTypes';

interface IDefaultState {
  loading: boolean;
}

const defaultState: IDefaultState = {
  loading: false,
};

const globalReducer = (state: IDefaultState = defaultState, action: GlobalDispatchTypes): IDefaultState => {
  switch (action.type) {
    case SET_LOADER_STATUS:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default globalReducer;

import { combineReducers } from 'redux';

import authReducer from './AuthReducer';
import globalReducer from './GlobalReducer';

export default combineReducers({
  auth: authReducer,
  global: globalReducer,
});

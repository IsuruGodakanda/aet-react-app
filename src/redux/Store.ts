import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import RootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const Store = createStore(
  RootReducer,
  initialState,
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(...middleware))
    : compose(applyMiddleware(...middleware))
);

export type RootStore = ReturnType<typeof RootReducer>;

export default Store;

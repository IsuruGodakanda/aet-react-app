import './index.css';
import './utils/fontAwesomeUtil';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';

import App from './App';
import Store from './redux/Store';

toast.configure({
  autoClose: 5000,
  draggable: false,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

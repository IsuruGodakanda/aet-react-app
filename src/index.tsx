import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';

import App from './App';
import Routes from './routes';
import Store from './redux/Store';

toast.configure({
  autoClose: 5000,
  draggable: false,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App>
        <Routes />
      </App>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

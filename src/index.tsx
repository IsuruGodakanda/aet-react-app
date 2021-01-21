import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';

import App from './App';
import Routes from './routes';

toast.configure({
  autoClose: 5000,
  draggable: false,
});

ReactDOM.render(
  <React.StrictMode>
    <App>
      <Routes />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);

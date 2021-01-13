import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Routes from './routes';

ReactDOM.render(
  <React.StrictMode>
    <App>
      <Routes />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);

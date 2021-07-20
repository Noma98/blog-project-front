import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css';
import Api from './services/api';

const api = new Api();

ReactDOM.render(
  <React.StrictMode>
    <App api={api} />
  </React.StrictMode>,
  document.getElementById('root')
);


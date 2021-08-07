import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import './index.css';
import Api from './services/api';

const api = new Api();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App api={api} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


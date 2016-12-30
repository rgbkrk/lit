import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const red = require('./reducers')
global.red = red;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

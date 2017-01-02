/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import {
  notebookReducer,
} from './reducers';

function rootReducer(state: State, action: CellAction): State {
  // Trying this out rather than using combineReducers
  // up until we have a more complex state
  return {
    notebook: notebookReducer(state.notebook, action),
  }
}

const store = createStore(rootReducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

store.dispatch({
  type: 'NEW_CELL_BEFORE',
  cellType: 'code',
  id: 'there aren\'t any cells yet',
  source: 'hey there',
})

store.dispatch({
  type: 'NEW_CELL_BEFORE',
  cellType: 'code',
  id: 'not like I know what cells there are',
  source: 'hey there again',
})

store.dispatch({
  type: 'CHANGE_TEXT',
  source: 'WOOOO',
  id: '1',
})

store.dispatch({
  type: 'APPEND_OUTPUT',
  output: {
    data: {},
    metadata: {},
  },
  id: '2',
})

store.dispatch({
  type: 'NEW_CELL_BEFORE',
  cellType: 'markdown',
  id: 'not like I know what cells there are',
  source: 'markdown is _great_',
})

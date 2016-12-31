/* @flow */

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import NotebookEditor from './components/notebook-editor';

const _ = require('lodash/fp');

import {
  initialNotebook,
  emptyCodeCell,
} from './reducers';

// Silly default notebook for now
const defaultNotebook = _.cloneDeep(initialNotebook);
const cell = _.cloneDeep(emptyCodeCell);
cell.source = 'hey'
defaultNotebook.cellMap['1'] = cell;
defaultNotebook.cellOrder.push('1');

type Props = {
  +notebook: Notebook,
}

class App extends Component {
  props: Props;

  static defaultProps: {
    notebook: Notebook,
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Notebook time!</h2>
        </div>
        <NotebookEditor notebook={this.props.notebook} />
      </div>
    );
  }
}

App.defaultProps = { notebook: defaultNotebook };

export default App;

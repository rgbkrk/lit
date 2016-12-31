/* @flow */

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux';

import NotebookEditor from './components/notebook-editor';

const _ = require('lodash/fp');

type Props = {
  +notebook: Notebook,
}

class PresentationalApp extends Component {
  props: Props;

  static defaultProps: {
    notebook: Notebook,
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>{"{lit}erate"}</h2>
        </div>
        <NotebookEditor notebook={this.props.notebook} />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => state;

const App = connect(
  mapStateToProps
)(PresentationalApp)

export default App;

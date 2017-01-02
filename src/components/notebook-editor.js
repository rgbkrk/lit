/* @flow */

import React from 'react'

const _ = require('lodash/fp');

type Props = {
  notebook: Notebook,
}

export const Editor = (props: {source: string}): React.Element<any> => {
  return <pre>{props.source}</pre>
}

export const Outputs = (props: { outputs: Array<Output> }): React.Element<any> => {
  return (
    <ul>
      {
        props.outputs.map((output, idx) => <li key={idx}>{JSON.stringify(output)}</li>)
      }
    </ul>
  )
}

export const MarkdownCellEditor = (props: MarkdownData): React.Element<any> => {
  return (
    <div>
      <Editor source={props.source} />
    </div>
  )
}

export class CodeCellEditor extends React.PureComponent {
  props: CodeData;

  render() {
    return (
      <div>
        <Editor source={this.props.source} />
        <Outputs outputs={this.props.outputs} />
      </div>
    );
  }
}

export class CellEditor extends React.PureComponent {
  props: {
    cell: Cell,
  }

  render() {
    if(this.props.cell.type === 'code') {
      return <CodeCellEditor
        source={this.props.cell.data.source}
        outputs={this.props.cell.data.outputs}
      />
    }
    return <MarkdownCellEditor source={this.props.cell.data.source} />
  }
}

export default class NotebookEditor extends React.Component{
  props: Props;

  render() {
    return (
      <div>
        {
          _.at(this.props.notebook.cellOrder, this.props.notebook.cellMap)
            .map((cell: Cell, idx: number) =>
              <CellEditor cell={cell} key={this.props.notebook.cellOrder[idx]} />
            )
        }
      </div>
    )
  }

}

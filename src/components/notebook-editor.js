/* @flow */

import React from 'react'

const _ = require('lodash/fp');

type Props = {
  notebook: Notebook,
}

type CellProps = {
  cell: Cell,
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

export const CellEditor = (props: CellProps): React.Element<any> => {
  return (
    <div>
      <Editor source={props.cell.source} />
      <Outputs outputs={props.cell.outputs} />
    </div>
  )
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

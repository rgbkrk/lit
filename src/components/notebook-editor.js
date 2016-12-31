/* @flow */

import React from 'react'

const _ = require('lodash/fp');

type Props = {
  notebook: Notebook,
}

type CellProps = {
  cell: Cell,
}

export const CellEditor = (props: CellProps): React.Element<any> => {
  return <pre>{props.cell.source}</pre>
}

export default class NotebookEditor extends React.Component{
  props: Props;

  render() {
    console.log(this.props);
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

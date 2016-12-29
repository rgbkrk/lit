/* @flow */

import _ from 'lodash/fp'

export type CodeCell = {
  type: 'code',
  source: string,
  outputs: Array<string>,
}

export type Cell = CodeCell

export type Notebook = {
  cellMap: Map<string, Cell>,
  cellOrder: Array<Cell>
}

const initialNotebook = {
  cellMap: new Map(),
  cellOrder: [],
}

export type AppendOutputAction = { type: 'APPEND_OUTPUT', id: string, output: string }

export type CellAction =
    AppendOutputAction
  | { type: 'CHANGE_TEXT',   id: string, source: string }

type CellActionTypes = 'APPEND_OUTPUT' | 'CHANGE_TEXT'

function notebookApp(state: Notebook = initialNotebook, action: CellAction) {
  switch(action.type) {
    case 'APPEND_OUTPUT':
      return _.update(
        ['cellMap', action.id, 'outputs'],
        _.concat(_, action.output)
      )
  }
}

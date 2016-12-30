/* @flow */

const _ = require('lodash/fp')

export type CellType = 'code' | 'markdown'

export type CodeCell = {|
  +type: 'code',
  +source: string,
  +outputs: Array<string>,
|}

export type MarkdownCell = {|
  +type: 'markdown',
  +source: string,
|}

export type Cell = CodeCell | MarkdownCell

export type Notebook = {|
  +cellMap: Map<string, Cell>,
  +cellOrder: Array<Cell>,
|}

export const initialNotebook = {
  cellMap: new Map(),
  cellOrder: [],
}

export const emptyCodeCell = {
  source: '',
  type: 'code',
  outputs: [],
}

export const emptyMarkdownCell = {
  source: '',
  type: 'markdown',
}

export type CellAction =
    {| type: 'APPEND_OUTPUT', id: string, output: string |}
  | {| type: 'CHANGE_TEXT', id: string, source: string |}
  | {| type: 'NEW_CELL_AFTER', id: string, cellType: CellType |}

function uncurriedInsert(index, item, list) {
  return _.concat(
    _.concat(_.slice(0, index, list), item),
    _.slice(index, list.length, list)
  )
}
const insert = _.curry(uncurriedInsert)

export function notebookReducer(notebook: Notebook = initialNotebook, action: CellAction): Notebook {
  switch(action.type) {
    case 'APPEND_OUTPUT':
      return _.update(
        ['cellMap', action.id, 'outputs'],
        _.concat(_, action.output),
        notebook
      )
    case 'CHANGE_TEXT':
      return _.set(
        ['cellMap', action.id, 'source'],
        action.source,
        notebook
      )
    case 'NEW_CELL_BEFORE':
      const { cellType, id } = action;
      const cell = cellType === 'markdown' ? emptyMarkdownCell : emptyCodeCell;
      const cellID: string = _.uniqueId()
      const index: number = Math.max(_.indexOf(id, notebook.cellOrder), 0)

      debugger;

      return _.flow([
        _.set(['cellMap', cellID], cell),
        _.update(['cellOrder'], insert(index, cellID))
      ])(notebook)

    default:
      return notebook
  }
}

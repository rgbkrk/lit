/* @flow */

const _ = require('lodash/fp')

export const initialNotebook : Notebook = {
  cellMap: {},
  cellOrder: [],
}

export const emptyCodeCell : CodeCell = {
  source: '',
  type: 'code',
  outputs: [],
}

export const emptyMarkdownCell : MarkdownCell = {
  source: '',
  type: 'markdown',
}

function uncurriedInsert<T>(index: number, item: T, list: Array<T>) {
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
      const { cellType, id, source } = action;
      const cell = _.cloneDeep(cellType === 'markdown' ? emptyMarkdownCell : emptyCodeCell);
      cell.source = source;

      const cellID: string = _.uniqueId()
      const index: number = Math.max(_.indexOf(id, notebook.cellOrder), 0)

      return _.flow([
        _.set(['cellMap', cellID], cell),
        _.update(['cellOrder'], insert(index, cellID))
      ])(notebook)
    default:
      return notebook
  }
}

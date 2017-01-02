/* @flow */

const _ = require('lodash/fp')

/**
 * insert an item into an array at index
 */
function uncurriedInsert<T>(index: number, item: T, list: Array<T>) {
  return _.concat(
    _.concat(_.slice(0, index, list), item),
    _.slice(index, list.length, list)
  )
}
const insert = _.curry(uncurriedInsert)

function createMonocellNotebook(initialCell = createCodeCell()) {
  const id = _.uniqueId()
  return {
    cellMap: {
      [id]: initialCell,
    },
    cellOrder: [id],
  }
}

function createCodeCell(source : string = '', outputs : Array<Output> = []) : CodeCell {
  return {
    type: 'code',
    data: {
      source,
      outputs,
    }
  }
}

function createMarkdownCell(source: string = '') : MarkdownCell {
  return {
    type: 'markdown',
    data: {
      source,
    }
  }
}

export function notebookReducer(notebook: Notebook = createMonocellNotebook(), action: CellAction): Notebook {
  switch(action.type) {
    case 'APPEND_OUTPUT':
      return _.update(
        ['cellMap', action.id, 'data', 'outputs'],
        _.concat(_, action.output),
        notebook
      )
    case 'CHANGE_TEXT':
      return _.set(
        ['cellMap', action.id, 'data', 'source'],
        action.source,
        notebook
      )
    case 'NEW_CELL_BEFORE':
      const { cellType, id, source='' } = action;

      const cellID: string = _.uniqueId()
      const index: number = Math.max(_.indexOf(id, notebook.cellOrder), 0)

      const cell : Cell = cellType === 'code' ? createCodeCell(source) : createMarkdownCell(source)

      return _.flow([
        _.set(['cellMap', cellID], cell),
        _.update(['cellOrder'], insert(index, cellID))
      ])(notebook)
    default:
      return notebook
  }
}

/* @flow */

export type CellType = 'code' | 'markdown'

export type Output = {|
  data: Object,
  metadata: Object,
|}

export type CodeCell = {|
  +type: 'code',
  +source: string,
  +outputs: Array<Output>,
|}

export type MarkdownCell = {|
  +type: 'markdown',
  +source: string,
|}

export type Cell = CodeCell | MarkdownCell

export type Notebook = {|
  // +cellMap: Map<string, Cell>,
  +cellMap: {[id:string]: Cell},
  +cellOrder: Array<string>,
|}

export type CellAction =
    {| type: 'APPEND_OUTPUT', id: string, output: Output |}
  | {| type: 'CHANGE_TEXT', id: string, source: string |}
  | {| type: 'NEW_CELL_AFTER', id: string, cellType: CellType |}

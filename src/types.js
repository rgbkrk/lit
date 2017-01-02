/* @flow */

export type CellType = 'code' | 'markdown'

export type Output = {|
  data: Object,
  metadata: Object,
|}

export type CodeData = {
  +source: string,
  +outputs: Array<Output>,
}

export type MarkdownData = {
  +source: string,
}

export type MarkdownCell = {|
  type: 'markdown',
  data: MarkdownData,
|}

export type CodeCell = {|
  type: 'code',
  data: CodeData,
|}

export type Cell = MarkdownCell | CodeCell

export type Notebook = {|
  // +cellMap: Map<string, Cell>,
  +cellMap: {[id:string]: Cell},
  +cellOrder: Array<string>,
|}

export type CellAction =
    {| type: 'APPEND_OUTPUT', id: string, output: Output |}
  | {| type: 'CHANGE_TEXT', id: string, source: string |}
  | {| type: 'NEW_CELL_BEFORE', id: string, cellType: CellType, source?: string |}

export type State = {
  notebook: Notebook,
}

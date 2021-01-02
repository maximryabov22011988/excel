import { defaultStyles } from '@core/constants/defaultValues'
import { parse } from '@core/parse'
import { toInlineStyles } from '@core/utils'

const charCode = {
  A: 65,
  Z: 90,
}

const DEFAULT_WIDTH = 120
const getWidth = (state, index) => (state[index]?.width ?? DEFAULT_WIDTH) + 'px'

const withWidthFrom = (state) => (content, index) => ({
  content,
  index,
  width: getWidth(state?.columnsState ?? {}, index),
})

const DEFAULT_HEIGHT = 24
const getHeight = (state, index) => (state[index]?.height ?? DEFAULT_HEIGHT) + 'px'

const toCellTemplate = (row, state) => ({ index, width }) => {
  const id = `${row}:${index}`
  const data = (state && state.dataState) ? (state.dataState[id] || '') : ''
  const styles = (state && state.stylesState) ? toInlineStyles({ ...defaultStyles, ...state.stylesState[id] }) : ''
  return `
    <div 
      class="row__cell" 
      contenteditable="true" 
      data-column-number=${index} 
      data-id="${id}" 
      data-type="cell"
      data-value="${data || ''}"
      style="${styles}; width: ${width}"  
    >
      ${parse(data) || ''}
    </div>
  `
}

const createResizeTemplate = (type = '') => {
  const classes = `"resize ${type ? `resize--${type}` : ''}"`
  const dataResize = `data-resize=${type}`
  return `<div class=${classes} ${dataResize}></div>`
}


const toColumnTemplate = ({ content, index, width }) => {
  return `
    <div 
      class="row__column" 
      data-type="resizable" 
      data-column-number=${index} 
      style="width: ${width}"
    >
      ${content}
      ${createResizeTemplate('column')}
    </div>
  `
}

const createRow = (content, info = '', state = {}) => {
  const resize = info ? createResizeTemplate('row') : ''
  const height = getHeight(state?.rowsState ?? {}, info)

  return `
    <div 
      class="row" 
      data-type="resizable" 
      data-row-number="${info}"
      style="height: ${height}"
    >
      <div class="row__info">
        ${info}
        ${resize}
      </div>
      <div class="row__data">${content}</div>
    </div>
  `
}

const toChar = (_, index) => String.fromCharCode(charCode.A + index)

export const createTable = (rowCount = 15, state = {}) => {
  const columnCount = charCode.Z - charCode.A + 1
  const columns = new Array(columnCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumnTemplate)
      .join('')

  const rows = []
  rows.push(createRow(columns, undefined, state))

  for (let row = 0; row < rowCount; row++) {
    const cells = new Array(columnCount)
        .fill('')
        .map(withWidthFrom(state))
        .map(toCellTemplate(row, state))
        .join('')

    rows.push(createRow(cells, row + 1, state))
  }

  return rows.join('')
}

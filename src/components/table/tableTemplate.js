const charCode = {
  A: 65,
  Z: 90,
}

const toCellTemplate = (content, index) => {
  return `
    <div class="row__cell" contenteditable="true" data-column-number=${index}>
      ${content}
    </div>
  `
}

const createResizeTemplate = (type = '') => {
  const classes = `"resize ${type ? `resize--${type}` : ''}"`
  const dataResize = `data-resize=${type}`
  return `<div class=${classes} ${dataResize}></div>`
}


const toColumnTemplate = (content, index) => {
  return `
    <div class="row__column" data-type="resizable" data-column-number=${index}>
      ${content}
      ${createResizeTemplate('column')}
    </div>
  `
}

const createRow = (content, info = '') => {
  const resize = info ? createResizeTemplate('row') : ''

  return `
    <div class="row" data-type="resizable">
      <div class="row__info">
        ${info}
        ${resize}
      </div>
      <div class="row__data">${content}</div>
    </div>
  `
}

const toChar = (_, index) => String.fromCharCode(charCode.A + index)

export const createTable = (rowCount = 15) => {
  const columnCount = charCode.Z - charCode.A + 1
  const columns = new Array(columnCount)
      .fill('')
      .map(toChar)
      .map(toColumnTemplate)
      .join('')

  const cells = new Array(columnCount)
      .fill('')
      .map(toCellTemplate)
      .join('')

  const rows = []
  rows.push(createRow(columns))
  for (let i = 0; i < rowCount; i++) {
    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}

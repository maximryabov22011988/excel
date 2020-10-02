const charCode = {
  A: 65,
  Z: 90,
}

const toCellTemplate = (content) => {
  return `
    <div class="row__cell" contenteditable="true">
      ${content}
    </div>
  `
}

const toColumnTemplate = (content) => {
  return `
    <div class="row__column">
      ${content}
    </div>
  `
}

const createRow = (content, info = '') => {
  return `
    <div class="row">
      <div class="row__info">${info}</div>
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

import { range } from '@core/utils'

export const shouldResize = (event) => event.target.dataset.resize

export const isCell = ({ data }) => data?.type === 'cell'

export const matrix = (target, current) => {
  const targetCell = target.id({ isParse: true })
  const currentCell = current.id({ isParse: true })

  const columns = range(targetCell.column, currentCell.column)
  const rows = range(targetCell.row, currentCell.row)

  return columns.reduce((result, column) => {
    rows.forEach((row) => result.push(`${row}:${column}`))
    return result
  }, []
  )
}

export const nextSelector = ({ key, row, column }) => {
  const MIN_VALUE = 0

  switch (key) {
    case 'Tab':
    case 'ArrowRight': {
      column++
      break
    }
    case 'ArrowLeft': {
      column = column - 1 < MIN_VALUE ? MIN_VALUE : column - 1
      break
    }
    case 'ArrowUp': {
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
      break
    }
    default: {
      row++
    }
  }

  return `[data-id="${row}:${column}"]`
}

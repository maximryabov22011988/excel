import { storage } from '@core/utils/storage'

const createTableRecord = ([id, tableName, openedAt]) => {
  return `
    <li class="table-list__record">
        <a href="#excel/${id}">${tableName}</a>
        <strong>${openedAt}</strong>
    </li>
  `
}

const getAllTableRecords = () => {
  const records = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    const [, id] = key.split(':')
    const model = storage(key)
    const openedAt = new Date(model.openedAt)
    const openedAtDate = openedAt.toLocaleDateString()
    const openedAtTime = openedAt.toLocaleTimeString()

    records.push([id, model.tableName, `${openedAtDate } ${openedAtTime}`])
  }

  return records
}


export const createTableRecords = () => {
  const tableRecords = getAllTableRecords()

  if (tableRecords.length === 0) {
    return `<p class="table-list__no-records">Вы пока не создали ни одной таблицы</p>`
  }

  return `
    <div class="table-list__header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="table-list__records">
      ${tableRecords.map(createTableRecord).join('')}         
    </ul>
  `
}

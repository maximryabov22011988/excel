import { Page } from '@core/Page'
import { $ } from '@core/utils/dom'

import { createTableRecords } from './utils'

export class DashboardPage extends Page {
  getRootNodeContent() {
    const id = Date.now().toString()

    return $.createNode('div', 'dashboard').html(`
      <div class="dashboard__header">
        <h1>Excel - Панель управления</h1>
      </div>

      <div class="dashboard__new">
        <div class="dashboard__wrap">
          <a class="dashboard__create-button" href="#excel/${id}">Новая таблица</a>
        </div>
      </div>

      <div class="table-list dashboard__table dashboard__wrap">
        ${createTableRecords()}
      </div>
    `)
  }
}

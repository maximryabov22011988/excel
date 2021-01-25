import { ExcelComponent } from '@core/ExcelComponent'
import { defaultTableName } from '@core/constants/defaultValues'
import { ActiveRoute } from '@core/routes/ActiveRoute'
import { $ } from '@core/utils/dom'
import { storage } from '@core/utils/storage'

import { createHeader } from '@/components/Header/headerTemplate'
import { changeTableName } from '@/store/actions'

export class Header extends ExcelComponent {
  static className = 'excel-header'

  constructor(componentContainerNode, options = {}) {
    super(componentContainerNode, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    })
  }

  onInput(event) {
    this.updateTableName($(event.target).text())
  }

  onClick(event) {
    const targetNode = $(event.target)

    if (targetNode.data.button === 'remove') {
      const isOk = confirm('Вы действительно хотите удалить таблицу?')
      if (isOk) {
        storage.remove(`excel:${ActiveRoute.param}`)
        ActiveRoute.changeTo('')
      }
    }

    if (targetNode.data.button === 'exit') {
      ActiveRoute.changeTo('')
    }
  }

  updateTableName(value) {
    this.dispatch(changeTableName(value))
  }

  get template() {
    const tableName = this.store.getState().tableName || defaultTableName
    return createHeader(tableName)
  }

  toHTML() {
    return this.template
  }
}

import { ExcelComponent } from '@core/ExcelComponent'
import { defaultTableName } from '@core/constants/defaultValues'
import { $ } from '@core/utils/dom'

import { createHeader } from '@/components/header/headerTemplate'
import { changeTableName } from '@/store/actions'

export class Header extends ExcelComponent {
  static className = 'excel-header'

  constructor(componentContainerNode, options = {}) {
    super(componentContainerNode, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    })
  }

  onInput(event) {
    this.updateTableName($(event.target).text())
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

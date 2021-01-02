import { ExcelStateComponent } from '@core/ExcelStateComponent'
import { defaultStyles } from '@core/constants/defaultValues'
import { events } from '@core/constants/events'
import { $ } from '@core/utils/dom'

import { createToolbar } from './toolbarTemplate'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel-toolbar'

  constructor(componentContainerNode, options = {}) {
    super(componentContainerNode, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribeBy: ['currentStyles'],
      ...options,
    })
  }

  prepare() {
    this.initState(defaultStyles)
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }

  onClick(event) {
    const targetNode = $(event.target)
    if (targetNode.data.type === 'toolbar-button') {
      const style = JSON.parse(targetNode.data.value)
      this.emit(events.TOOLBAR_APPLY_STYLE, style)
    }
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }
}

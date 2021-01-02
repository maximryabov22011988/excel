import { ExcelComponent } from '@core/ExcelComponent'

import { events } from '@core/constants/events'
import { ENTER, TAB } from '@core/constants/keys'

import { $ } from '@core/utils/dom'

export class Formula extends ExcelComponent {
  static className = 'excel-formula'

  constructor(componentContainerNode, options = {}) {
    super(componentContainerNode, {
      name: 'Formula',
      subscribeBy: ['currentText'],
      listeners: ['input', 'keydown'],
      ...options,
    })
  }

  toHTML() {
    return `
        <label for="formula" class="excel-formula__label">fx</label>
        <input 
          type="text" 
          class="excel-formula__input" 
          id="formula" 
          spellcheck="false" 
        />
    `
  }

  init() {
    super.init()
    this.input = this.componentContainerNode.find('input')

    this.on(events.TABLE_INPUT, (cellNode) => {
      this.input.text(cellNode.data.value || cellNode.text())
    })
  }

  storeChanged(changes) {
    this.input.text(changes.currentText)
  }

  onInput(event) {
    this.emit(events.FORMULA_INPUT, $(event.target).text())
  }

  onKeydown(event) {
    const keys = [ENTER, TAB]
    if (keys.includes(event.key)) {
      $(event.target).blur()
      this.emit(events.FORMULA_DONE, event)
    }
  }
}

import { $ } from '@core/utils/dom';
import { events } from '@core/constants/events';
import { ExcelComponent } from '@core/ExcelComponent';
import { ENTER, TAB } from '@core/constants/keys';

export class Formula extends ExcelComponent {
  static className = 'excel-formula'

  constructor(componentContainerNode, options = {}) {
    super(componentContainerNode, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
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
    `;
  }

  init() {
    super.init()
    this.input = this.componentContainerNode.find('input')

    this.subscribe(events.TABLE_INPUT, (value) => {
      this.input.text(value)
    })
  }

  onInput(event) {
    this.dispatch(events.FORMULA_INPUT, $(event.target).text())
  }

  onKeydown(event) {
    const keys = [ENTER, TAB]
    if (keys.includes(event.key)) {
      $(event.target).blur()
      this.dispatch(events.FORMULA_DONE, event)
    }
  }
}

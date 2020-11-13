import { events } from '@core/constants/events';
import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/utils/dom';
import { TAB, ENTER, ARROW_RIGHT, ARROW_LEFT, ARROW_UP, ARROW_DOWN } from '@core/constants/keys';

import { resizeHandler } from '@/components/table/tableResize';
import { TableSelection } from '@/components/table/TableSelection';
import { createTable } from '@/components/table/tableTemplate';
import { isCell, matrix, nextSelector, shouldResize } from '@/components/table/utils';

export class Table extends ExcelComponent {
  static className = 'excel-table'

  constructor(componentContainerNode, options = {}) {
    super(componentContainerNode, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
  }

  toHTML() {
    return createTable(40)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    this.selectCell(this.componentContainerNode.find('[data-id="0:0"]'))

    this.subscribe(events.FORMULA_INPUT, (value) => {
      this.selection.current.text(value)
    })

    this.subscribe(events.FORMULA_DONE, (event) => {
      event.preventDefault()
      this.selection.current.focus()
    })
  }

  selectCell(cell) {
    this.selection.select(cell)
    this.dispatch(events.TABLE_INPUT, cell.text())
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.componentContainerNode)
    }

    const target = $(event.target);
    if (isCell(target)) {
      if (event.shiftKey) {
        const cellGroup = matrix(target, this.selection.current)
            .map((id) => this.componentContainerNode.find(`[data-id="${id}"]`))

        this.selection.selectGroup(cellGroup)
      } else {
        this.selection.select(target)
        this.dispatch(events.TABLE_INPUT, target.text() || '')
      }
    }
  }

  onKeydown(event) {
    const { row, column } = this.selection.current.id({ isParse: true })

    const { key } = event
    const keys = [TAB, ENTER, ARROW_RIGHT, ARROW_LEFT, ARROW_UP, ARROW_DOWN];

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      this.selectCell(this.componentContainerNode.find(nextSelector({ key, row, column })))
    }
  }

  onInput(event) {
    this.dispatch(events.TABLE_INPUT, $(event.target).text())
  }
}


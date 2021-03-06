import { ExcelComponent } from '@core/ExcelComponent'
import { defaultStyles } from '@core/constants/defaultValues'
import { FORMULA_DONE, FORMULA_INPUT, TABLE_INPUT, TOOLBAR_APPLY_STYLE } from '@core/constants/events'
import { TAB, ENTER, ARROW_RIGHT, ARROW_LEFT, ARROW_UP, ARROW_DOWN } from '@core/constants/keys'
import { parse } from '@core/utils/parse'
import { $ } from '@core/utils/dom'

import { resizeHandler } from '@/components/Table/tableResize'
import { TableSelection } from '@/components/Table/TableSelection'
import { createTable } from '@/components/Table/tableTemplate'
import { isCell, matrix, nextSelector, shouldResize } from '@/components/Table/utils'

import { applyStyle, changeText, resizeTable, setCurrentStyles } from '@/store/actions'

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
    return createTable(40, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    this.selectCell(this.componentContainerNode.find('[data-id="0:0"]'))

    this.on(FORMULA_INPUT, (value) => {
      this.selection.current
          .attr('data-value', value)
          .text(parse(value))
      this.updateTextInStore(value)
    })

    this.on(FORMULA_DONE, (event) => {
      event.preventDefault()
      this.selection.current.focus()
    })

    this.on(TOOLBAR_APPLY_STYLE, (style) =>{
      this.selection.applyStyle(style)
      this.dispatch(applyStyle({ style, ids: this.selection.selectedIds }))
    })
  }

  selectCell(cell) {
    this.selection.select(cell)
    this.emit(TABLE_INPUT, cell)

    const styles = cell.getStyles(Object.keys(defaultStyles))
    this.dispatch(setCurrentStyles({ styles }))
  }

  async resizeCell(event) {
    try {
      const resizeDate = await resizeHandler(event, this.componentContainerNode)
      this.dispatch(resizeTable(resizeDate))
    } catch (e) {
      console.warn(e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeCell(event)
    }

    const target = $(event.target)
    if (isCell(target)) {
      if (event.shiftKey) {
        const cellGroup = matrix(target, this.selection.current)
            .map((id) => this.componentContainerNode.find(`[data-id="${id}"]`))

        this.selection.selectGroup(cellGroup)
      } else {
        this.selectCell(target)
      }
    }
  }

  onKeydown(event) {
    const { row, column } = this.selection.current.id({ isParse: true })

    const { key } = event
    const keys = [TAB, ENTER, ARROW_RIGHT, ARROW_LEFT, ARROW_UP, ARROW_DOWN]

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      this.selectCell(this.componentContainerNode.find(nextSelector({ key, row, column })))
    }
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }

  updateTextInStore(value) {
    this.dispatch(changeText({
      value,
      id: this.selection.current.id(),
    }))
  }
}


export class TableSelection {
  static className = 'is-selected'

  constructor() {
    this.group = []
    this.current = null
  }

  get selectedIds() {
    return this.group.map((cellNode) => cellNode.id())
  }

  select(cellNode) {
    this.resetSelection()

    this.current = cellNode

    this.group.push(cellNode)
    cellNode.focus().addClass(TableSelection.className)
  }

  selectGroup(group = []) {
    this.resetSelection()
    this.group = group
    this.group.forEach((cellNode) => cellNode.addClass(TableSelection.className))
  }

  resetSelection() {
    this.group.forEach((cellNode) => cellNode.removeClass(TableSelection.className))
    this.group = []
  }

  applyStyle(style) {
    this.group.forEach((cellNode) => cellNode.setStyles(style))
  }
}

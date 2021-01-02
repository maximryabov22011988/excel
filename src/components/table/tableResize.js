import { $ } from '@core/utils/dom'

export const resizeHandler = ({ target }, componentContainerNode) => {
  return new Promise((resolve) => {
    const { resize: type } = target.dataset
    const isResizedColumn = type === 'column'
    const resizerNode = $(target)
    const resizerSide = isResizedColumn ? 'right' : 'bottom'
    const parentNode = resizerNode.closest('[data-type="resizable"]')
    const parentCoords = parentNode.getCoords()

    let delta
    resizerNode.setStyles({ opacity: 1 })

    document.onmousemove = ({ pageX, pageY }) => {
      resizerNode.addClasses('is-active')

      if (isResizedColumn) {
        delta = pageX - parentCoords.right
        resizerNode.setStyles({ right: `${-delta}px` })
      } else {
        delta = pageY - parentCoords.bottom
        resizerNode.setStyles({ bottom: `${-delta}px` })
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      let value
      if (isResizedColumn) {
        value = parentCoords.width + delta
        parentNode.setStyles({ width: `${value}px` })

        for (const cell of componentContainerNode.findAll(`[data-column-number="${parentNode.data.columnNumber}"]`)) {
          $(cell).setStyles({ width: `${parentCoords.width + delta}px` })
        }
      } else {
        value = parentCoords.height + delta
        parentNode.setStyles({ height: `${value}px` })
      }

      resizerNode.removeClasses('is-active')
      resizerNode.setStyles({ opacity: 0, [resizerSide]: '-1px' })

      resolve({
        type,
        id: parentNode.data[isResizedColumn ? 'columnNumber' : 'rowNumber'],
        [isResizedColumn ? 'width' : 'height']: value,
      })
    }
  })
}


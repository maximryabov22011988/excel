import { $ } from '@core/utils/dom';

export const resizeHandler = (event, componentContainerNode) => {
  const resizerNode = $(event.target)
  const resizerSide= resizerNode.data.resize === 'column' ? 'right' : 'bottom'
  const parentNode = resizerNode.closest('[data-type="resizable"]')
  const parentCoords = parentNode.getCoords()
  const isResizedColumn = event.target.dataset.resize === 'column'

  let delta;
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

    if (isResizedColumn) {
      parentNode.setStyles({ width: `${parentCoords.width + delta}px` })

      for (const cell of componentContainerNode.findAll(`[data-column-number="${parentNode.data.columnNumber}"]`)) {
        $(cell).setStyles({ width: `${parentCoords.width + delta}px` })
      }
    } else {
      parentNode.setStyles({ height: `${parentCoords.height + delta}px` })
    }

    resizerNode.removeClasses('is-active')
    resizerNode.setStyles({ opacity: 0, [resizerSide]: '-1px' })
  }
}


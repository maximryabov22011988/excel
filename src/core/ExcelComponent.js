import { DOMListener } from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor(componentContainerNode, options = {}) {
    super(componentContainerNode, options.listeners);
    this.name = options.name || ''
  }

  toHTML() {
    throw new Error('To implement the "toHTML" method in the component')
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
  }
}

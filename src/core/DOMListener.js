import { capitalize } from '@core/utils';

export class DOMListener {
  constructor(componentContainerNode, listeners = []) {
    if (!componentContainerNode) {
      throw new Error('No "componentContainerNode" provided for DOMListener')
    }

    this.componentContainerNode = componentContainerNode
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.name} Component`)
      }
      this[method] = this[method].bind(this)
      this.componentContainerNode.addListener(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      this.componentContainerNode.removeListener(listener, this[method])
    })
  }
}

const getMethodName =(eventName) => `on${capitalize(eventName)}`


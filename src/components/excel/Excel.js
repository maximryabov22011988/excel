import { $ } from '@core/utils/dom';
import { Emitter } from '@core/Emitter';

export class Excel {
  constructor(selector, options) {
    this.rootNode = $(selector)
    this.components = options.components || []
    this.emitter = new Emitter()
  }

  getContainerNode() {
    const mainContainerNode = $.createNode('div', 'excel')

    const componentOptions = {
      emitter: this.emitter,
    }

    this.components = this.components.map((Component) => {
      const componentContainerNode = $.createNode('div', Component.className)
      const component = new Component(componentContainerNode, componentOptions)
      componentContainerNode.html(component.toHTML())
      mainContainerNode.append(componentContainerNode)

      return component
    })

    return mainContainerNode
  }

  render() {
    this.rootNode.append(this.getContainerNode())
    this.components.forEach((component) => component.init())
  }

  destroy() {
    this.components.forEach((component) => component.destroy())
  }
}

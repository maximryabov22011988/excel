import { $ } from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.rootNode = $(selector)
    this.components = options.components || []
  }

  getContainerNode() {
    const mainContainerNode = $.createNode('div', 'excel')

    this.components = this.components.map((Component) => {
      const componentContainerNode = $.createNode('div', Component.className)
      const component = new Component(componentContainerNode)
      componentContainerNode.html(component.toHTML())
      mainContainerNode.append(componentContainerNode)

      return component
    })

    this.components.forEach((component) => component.init())

    return mainContainerNode
  }

  render() {
    this.rootNode.append(this.getContainerNode())
  }
}

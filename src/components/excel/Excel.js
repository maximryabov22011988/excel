import { StoreSubscriber } from '@core/StoreSubscriber'
import { Emitter } from '@core/Emitter'
import { $ } from '@core/utils/dom'

import { updateOpenedDate } from '@/store/actions'

export class Excel {
  constructor(options) {
    this.components = options.components || []
    this.store = options.store
    this.emitter = new Emitter()
    this.subscriber = new StoreSubscriber(this.store)
  }

  getContainerNode() {
    const mainContainerNode = $.createNode('div', 'excel')

    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
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

  init() {
    this.store.dispatch(updateOpenedDate())
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach((component) => component.init())
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach((component) => component.destroy())
  }
}

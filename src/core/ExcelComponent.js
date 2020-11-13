import { DOMListener } from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor(componentContainerNode, options = {}) {
    super(componentContainerNode, options.listeners);

    this.name = options.name || ''
    this.emitter = options.emitter

    this.unsubscribers = []

    this.prepare()
  }

  // Настраиваем компонент до инициализации
  prepare() {}

  // Уведомляем слушателей о событии event
  dispatch(event, ...args) {
    this.emitter.dispatch(event, ...args)
  }

  // Подписываемся на событие event
  subscribe(event, fn) {
    const unsubscribe = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsubscribe)
  }

  // Инициализируем компонент и добавляем слушателей
  init() {
    this.initDOMListeners()
  }

  // Удаляем компонент и слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach((unsubscribe) => {
      unsubscribe()
    })
  }

  toHTML() {
    throw new Error('To implement the "toHTML" method in the component')
  }
}

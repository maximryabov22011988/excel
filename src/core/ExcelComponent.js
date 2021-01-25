import { DOMListener } from '@core/DOMListener'

export class ExcelComponent extends DOMListener {
  constructor(componentContainerNode, options = {}) {
    super(componentContainerNode, options.listeners)

    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribeBy = options.subscribeBy || []
    this.store = options.store
    this.subscriptions = []
    this.prepare()
  }

  // Настраиваем компонент до инициализации
  prepare() {}

  // Уведомляем слушателей о событии event
  emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Подписываемся на событие event
  on(event, fn) {
    const unsubscribe = this.emitter.on(event, fn)
    this.subscriptions.push(unsubscribe)
  }

  dispatch(action) {
    this.store.dispatch(action)
  }

  // Приходят изменения по тем полям, на которые мы подписались
  storeChanged() {}

  isWatching(key) {
    return this.subscribeBy.includes(key)
  }

  // Инициализируем компонент и добавляем слушателей
  init() {
    this.initDOMListeners()
  }

  // Удаляем компонент и слушателей
  destroy() {
    this.removeDOMListeners()
    this.subscriptions.forEach((unsubscribe) => {
      unsubscribe()
    })
  }

  toHTML() {
    throw new Error('To implement the "toHTML" method in the component')
  }
}

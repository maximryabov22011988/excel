import { isEqual } from '@core/utils'

class StoreSubscriber {
  constructor(store) {
    this.prevState = {}
    this.state = store
    this.sub = null
  }

  subscribeComponents(components) {
    this.prevState = this.state.getState()

    this.sub = this.state.subscribe((state) => {
      Object.keys(state).forEach((key) => {
        if (!isEqual(this.prevState[key], state[key])) {
          components.forEach((component) => {
            if (component.isWatching(key)) {
              const changes = { [key]: state[key] }
              component.storeChanged(changes)
            }
          })
        }
      })

      this.prevState = this.state.getState()
    })
  }

  unsubscribeFromStore() {
    this.sub.unsubscribe()
  }
}

export { StoreSubscriber }

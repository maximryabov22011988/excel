import { init } from '@/store/actions'

export const createStore = (reducer, initialState = {}) => {
  let state = reducer(initialState, init() )
  let listeners = []

  return {
    subscribe(fn) {
      listeners.push(fn)

      return {
        unsubscribe() {
          listeners = listeners.filter((listener) => listener !== fn)
        },
      }
    },

    dispatch(action) {
      state = reducer(state, action)
      listeners.forEach((listener) => listener(state))
    },

    getState() {
      return JSON.parse(JSON.stringify(state))
    },
  }
}

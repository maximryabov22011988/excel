import { init } from '@/store/actions'

const ACTION_REGISTRY = new Set()

const TYPE_REG_EXP = /^(@[\dA-Z_]+)$/
const isValidType = (type) => TYPE_REG_EXP.test(type)

export const createAction = (actionType) => {
  if (ACTION_REGISTRY.has(actionType)) {
    throw new Error(`Duplicate action "${actionType}"`)
  } else {
    ACTION_REGISTRY.add(actionType)
  }

  if (!isValidType(actionType)) {
    console.warn(`Action type: ${actionType} doesn't match regexp pattern /^(@[\\dA-Z_]+)$/`)
  }

  const actionCreator = (payload = undefined) => ({
    type: actionType,
    payload,
  })

  actionCreator.toString = () => actionType
  actionCreator.valueOf = () => actionType

  return actionCreator
}

export const createReducer = (actionTypeToReducerMap, initialState) =>
  (state = initialState, action) => {
    const actionType = action.toString()
    const isUnknownAction = !((actionType in actionTypeToReducerMap) || ACTION_REGISTRY.has(actionType))
    const isInitAction = actionType === init().toString()

    if (!isInitAction && isUnknownAction) {
      console.warn(`Unknown action ${actionType}`)
    }

    const reducer = actionTypeToReducerMap[action.type]
    return reducer ? reducer(state, action) : state
  }

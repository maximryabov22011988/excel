import { applyStyle, changeTableName, changeText, resizeTable, setCurrentStyles, updateOpenedDate } from '@/store/actions'

import { defaultStyles, defaultTableName } from '@core/constants/defaultValues'
import { createReducer, deepClone } from '@core/store/utils'

const defaultState = {
  columnsState: {},
  rowsState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  tableName: defaultTableName,
  currentStyles: defaultStyles,
  openedAt: new Date().toJSON(),
}

const normalize = (state) => ({
  ...state,
  currentText: '',
  currentStyles: defaultStyles,
})

export const normalizeInitialState = (state) => state ? normalize(state) : deepClone(defaultState)

export const rootReducer = createReducer({
  [resizeTable]: (state, { payload: { type, id, width, height }}) => {
    const { columnsState = {}, rowsState = {}} = state

    if (type === 'column') {
      columnsState[id] = { width }

      return {
        ...state,
        columnsState,
      }
    } else {
      rowsState[id] = { height }

      return {
        ...state,
        rowsState,
      }
    }
  },

  [changeText]: (state, { payload: { id, value }}) => {
    const dataState = state.dataState || {}
    dataState[id] = value

    return {
      ...state,
      dataState,
      currentText: value,
    }
  },

  [setCurrentStyles]: (state, { payload: { styles }}) => {
    return {
      ...state,
      currentStyles: styles,
    }
  },

  [applyStyle]: (state, { payload: { style, ids }}) => {
    const newStylesState = state.stylesState || {}
    ids.forEach((id) => {
      newStylesState[id] = {
        ...newStylesState[id],
        ...style,
      }
    })

    return {
      ...state,
      stylesState: newStylesState,
      currentStyles: {
        ...state.currentStyles,
        ...style,
      },
    }
  },

  [changeTableName]: (state, { payload: tableName }) => {
    return {
      ...state,
      tableName,
    }
  },

  [updateOpenedDate]: (state) => {
    return {
      ...state,
      openedAt: new Date().toJSON(),
    }
  },
})


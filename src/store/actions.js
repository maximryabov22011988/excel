import { createAction } from '@core/utils/store'

export const init = createAction('@INIT')
export const resizeTable = createAction('@TABLE_COLUMN_RESIZE')
export const changeText = createAction('@TABLE_CHANGE_TEXT')
export const changeTableName = createAction('@TABLE_CHANGE_TABLE_NAME')
export const updateOpenedDate = createAction('@TABLE_UPDATE_OPENED_DATE')
export const applyStyle = createAction('@TABLE_APPLY_STYLE')
export const setCurrentStyles = createAction('@TOOLBAR_SET_CURRENT_STYLES')


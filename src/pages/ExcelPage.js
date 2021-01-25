import { Page } from '@core/Page'
import { debounce } from '@core/utils'
import { storage } from '@core/utils/storage'

import { Excel } from '@/components/Excel/Excel'
import { Header } from '@/components/Header/Header'
import { Toolbar } from '@/components/Toolbar/Toolbar'
import { Formula } from '@/components/Formula/Formula'
import { Table } from '@/components/Table/Table'

import { createStore } from '@core/store/createStore'
import { normalizeInitialState, rootReducer } from '@/store/rootReducer'

const getTableRecordKey = (param) => `excel:${param}`

export class ExcelPage extends Page {
  getRootNodeContent() {
    const param = this.param ? this.param : Date.now().toString()
    const state = storage(getTableRecordKey(param))
    const initialState = normalizeInitialState(state)
    const store = createStore(rootReducer, initialState)

    const storeListener = debounce((state) => {
      storage(getTableRecordKey(param), state)
    }, 300)

    store.subscribe(storeListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    })

    return this.excel.getContainerNode()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}

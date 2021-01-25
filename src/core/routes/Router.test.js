import { Page } from '../Page'
import { Router } from './Router'

class DashboardPage extends Page {
  getRootNodeContent() {
    const rootNode = document.createElement('div')
    rootNode.innerHTML = 'dashboard'
    return rootNode
  }
}

class ExcelPage extends Page {}

describe('Router:', () => {
  let router
  let rootNode

  beforeEach(() => {
    rootNode = document.createElement('div')
    router = new Router(rootNode, {
      dashboard: DashboardPage,
      excel: ExcelPage,
    })
  })

  test('should be defined', () => {
    expect(router).toBeDefined()
  })

  test('should render Dashboard page', () => {
    router.changePage()
    expect(rootNode.innerHTML).toBe('<div>dashboard</div>')
  })
})

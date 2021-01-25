import { ActiveRoute } from './ActiveRoute'
import { $ } from '../utils/dom'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }

    this.rootNode = $(selector)
    this.routes = routes
    this.page = null

    this.changePage = this.changePage.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePage)
    this.changePage()
  }

  changePage() {
    if (this.page) {
      this.page.destroy()
    }
    this.rootNode.clear()

    const Page = ActiveRoute.path.includes('excel') ? this.routes.excel : this.routes.dashboard
    this.page = new Page(ActiveRoute.param)
    this.rootNode.append(this.page.getRootNodeContent())
    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePage)
  }
}

export class Page {
  constructor(param) {
    this.param = param
  }

  getRootNodeContent() {
    throw new Error('Method "getRootNodeContent" should be implemented')
  }

  afterRender() {}

  destroy() {}
}

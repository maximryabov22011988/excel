class Dom {
  constructor(selector) {
    this.nativeElement = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.nativeElement.innerHTML = html
      return this
    }

    return this.nativeElement.outerHTML.trim()
  }

  text(text) {
    const isControl = this.nativeElement.tagName.toLocaleLowerCase() === 'input' || this.nativeElement.tagName.toLocaleLowerCase() === 'textarea'
    const property = isControl ? 'value' : 'textContent'

    if (typeof text !== 'undefined') {
      this.nativeElement[property] = text
      return this
    }

    return this.nativeElement[property].trim()
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.nativeElement
    }

    if (Element.prototype.append) {
      this.nativeElement.append(node)
    } else {
      this.nativeElement.appendChild(node)
    }
  }

  clear() {
    this.html('')
  }

  closest(selector) {
    return $(this.nativeElement.closest(selector))
  }

  get data() {
    return this.nativeElement.dataset
  }

  set data(newValue) {
    this.nativeElement.dataset = newValue
  }

  attr(name, value) {
    if (value) {
      this.nativeElement.setAttribute(name, value)
      return this
    }
    return this.nativeElement.getAttribute(name)
  }

  focus() {
    this.nativeElement.focus()
    return this
  }

  blur() {
    this.nativeElement.blur()
    return this
  }

  getCoords() {
    return this.nativeElement.getBoundingClientRect()
  }

  addClasses(classes) {
    return this.nativeElement.classList.add(classes)
  }

  removeClasses(classes) {
    return this.nativeElement.classList.remove(classes)
  }

  getStyles(styles = []) {
    return styles.reduce((result, cssProperty) => {
      result[cssProperty] = this.nativeElement.style[cssProperty]
      return result
    }, {})
  }

  setStyles(style) {
    return Object.entries(style).reduce((result, [property, value]) => {
      result[property] = value
      return result
    }, this.nativeElement.style)
  }

  addListener(eventType, callback) {
    this.nativeElement.addEventListener(eventType, callback)
  }

  removeListener(eventType, callback) {
    this.nativeElement.removeEventListener(eventType, callback)
  }

  findAll(selector) {
    return this.nativeElement.querySelectorAll(selector)
  }

  find(selector) {
    return $(this.nativeElement.querySelector(selector))
  }

  addClass(className) {
    this.nativeElement.classList.add(className)
    return this
  }

  removeClass(className) {
    this.nativeElement.classList.remove(className)
    return this
  }

  id({ isParse } = { isParse: false }) {
    if (isParse) {
      const [row, column] = this.id().split(':')
      return {
        row: Number(row),
        column: Number(column),
      }
    }

    return this.data.id
  }
}

export const $ = (selector) => new Dom(selector)

$.createNode = (tagName, classes = '') => {
  const node = document.createElement(tagName)
  if (classes) {
    node.classList.add(classes)
  }

  return $(node)
}

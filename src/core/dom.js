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

  getCoords() {
    return this.nativeElement.getBoundingClientRect()
  }

  addClasses(classes) {
    return this.nativeElement.classList.add(classes)
  }

  removeClasses(classes) {
    return this.nativeElement.classList.remove(classes)
  }

  setStyles(style) {
    return Object.entries(style).reduce((result, [cssProperty, value]) => {
      result[cssProperty] = value
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
}

export const $ = (selector) => new Dom(selector)

$.createNode = (tagName, classes = '') => {
  const node = document.createElement(tagName)
  if (classes) {
    node.classList.add(classes)
  }

  return $(node)
}

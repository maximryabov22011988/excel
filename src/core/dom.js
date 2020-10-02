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

  addListener(eventType, callback) {
    this.nativeElement.addEventListener(eventType, callback)
  }

  removeListener(eventType, callback) {
    this.nativeElement.removeEventListener(eventType, callback)
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

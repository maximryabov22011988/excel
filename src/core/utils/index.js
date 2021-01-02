export const capitalize = (string) => {
  if (typeof string !== 'string') {
    return ''
  }

  return string[0].toUpperCase() + string.slice(1)
}

export const range = (start, end) => {
  if (start > end) {
    [end, start] = [start, end]
  }

  return new Array(end - start + 1).fill('').map((_, index) => start + index)
}

export const isEqual = (value1, value2) => {
  if (typeof value1 === 'object' && typeof value2 === 'object') {
    return JSON.stringify(value1) === JSON.stringify(value2)
  }

  return value1 === value2
}

export const camelCaseToDashCase = (str) => str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)

export const toInlineStyles = (styles = {}) => {
  return Object.keys(styles).map((key) => `${camelCaseToDashCase(key)}: ${styles[key]}`).join(';')
}

export const debounce = (fn, delayInMs) => {
  let timerId

  return function(...args) {
    const runFn = () => {
      clearTimeout(timerId)
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args)
    }

    clearTimeout(timerId)
    timerId = setTimeout(runFn, delayInMs)
  }
}



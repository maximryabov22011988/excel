const storageHelper = (storage) => (key, data) => {
  if (!(storage || storage instanceof localStorage || storage instanceof sessionStorage)) {
    throw new Error('Expected local or session storage')
  }

  if (!data) {
    return JSON.parse(storage.getItem(key))
  }

  storage.setItem(key, JSON.stringify(data))
}

const storage = storageHelper(localStorage)
storage.remove = (key) => {
  localStorage.removeItem(key)
}

export { storage }

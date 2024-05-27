import axios from "axios";

export class RequestService {
  pendingPromises = {}
  setPromise (route, method, body, params, promise) {
    this.pendingPromises[route] = {
      promise,
      body,
      method,
      params,
      route
    }
  }
  getPromise (route, method, body, params) {
    const saved = this.pendingPromises[route]
    if (saved && typeof saved !== 'undefined' && saved.body === body && saved.method === method && saved.params === params) {
      return saved.promise
    } else {
      return null
    }
  }
  removePromise (route, method, body, params) {
    const saved = this.pendingPromises[route]
    if (saved && saved.body === body && saved.method === method && saved.params === params) {
      this.pendingPromises[route] = null
    }
  }
  async makePromise (route, method, { body, params }, mappingFunction) {
    const currentPromise = this.getPromise(route, method, body, params)
    if (currentPromise) {
      return currentPromise
    }
    const promise = new Promise(async (resolve, reject) => {
      axios[method](
          route, 
          (method === 'delete' || method === 'get') ? 
            { params } : params
        )
        .then((response) => {
          resolve(mappingFunction(response))
        })
        .catch((error) => {
          reject(error)
        })
        .finally(() => {
          this.removePromise(route, method, body, params)
        })
    })

    this.setPromise(route, method, body, params, promise)

    return promise
  }
}
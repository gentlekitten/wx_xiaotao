import store from '@/store'

export function getToken() {
  return store.getters.token
}

export function setToken(token) {
  return store.dispatch('user/token', token)
}

export function removeToken() {
  return store.dispatch('user/token', null)
}

const ACCESS_TOKEN_KEY = 'cakra_access_token'
const USER_NAME_KEY = 'cakra_user_name'
export const AUTH_LOGOUT_EVENT = 'cakra:auth-logout'

export function getAccessToken() {
  return window.localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function setAccessToken(token: string) {
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export function clearAccessToken() {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY)
}

export function logout() {
  clearAccessToken()
  window.localStorage.removeItem(USER_NAME_KEY)
  window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT))
}

export function isAuthenticated() {
  return Boolean(getAccessToken())
}

export function getStoredUserName() {
  return window.localStorage.getItem(USER_NAME_KEY)
}

export function setStoredUserName(name: string) {
  window.localStorage.setItem(USER_NAME_KEY, name)
}

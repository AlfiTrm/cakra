const ACCESS_TOKEN_KEY = 'cakra_access_token'
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
  window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT))
}

export function isAuthenticated() {
  return Boolean(getAccessToken())
}

export { clearAccessToken, getAccessToken, isAuthenticated, setAccessToken } from '../../../shared/services/authToken'

const REGISTER_SESSION_KEY = 'cakra_register_session_token'
const RESET_SESSION_KEY = 'cakra_reset_session_token'

export function getRegisterSessionToken() {
  return window.sessionStorage.getItem(REGISTER_SESSION_KEY)
}

export function setRegisterSessionToken(token: string) {
  window.sessionStorage.setItem(REGISTER_SESSION_KEY, token)
}

export function clearRegisterSessionToken() {
  window.sessionStorage.removeItem(REGISTER_SESSION_KEY)
}

export function getResetSessionToken() {
  return window.sessionStorage.getItem(RESET_SESSION_KEY)
}

export function setResetSessionToken(token: string) {
  window.sessionStorage.setItem(RESET_SESSION_KEY, token)
}

export function clearResetSessionToken() {
  window.sessionStorage.removeItem(RESET_SESSION_KEY)
}

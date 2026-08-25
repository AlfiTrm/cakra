const NAVIGATION_EVENT = 'cakra:navigate'

export function navigateTo(path: string) {
  window.dispatchEvent(new CustomEvent(NAVIGATION_EVENT, { detail: path }))
}

export { NAVIGATION_EVENT }

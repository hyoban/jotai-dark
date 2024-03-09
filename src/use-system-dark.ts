import { useSyncExternalStore } from 'react'

const query = '(prefers-color-scheme: dark)'

export function getSnapshot() {
  return window.matchMedia(query).matches
}

function getServerSnapshot(): undefined {
  return undefined
}

export function subscribe(callback: () => void) {
  const matcher = window.matchMedia(query)
  matcher.addEventListener('change', callback)
  return () => {
    matcher.removeEventListener('change', callback)
  }
}

export function useSystemDark() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

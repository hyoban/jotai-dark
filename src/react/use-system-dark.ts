import { useSyncExternalStore } from 'react'

import { getSystemDarkSnapshot, subscribeSystemDark } from '../utils'

function getServerSnapshot(): undefined {
  return undefined
}

export function useSystemDark() {
  return useSyncExternalStore(
    subscribeSystemDark,
    getSystemDarkSnapshot,
    getServerSnapshot,
  )
}

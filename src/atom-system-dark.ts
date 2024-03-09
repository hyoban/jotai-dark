import { atom } from 'jotai/vanilla'

import { getSystemDarkSnapshot, subscribeSystemDark } from './utils'

export function atomSystemDark() {
  const isSystemDarkAtom = atom<boolean | null>(null)

  isSystemDarkAtom.onMount = (set) => {
    if (typeof window === 'undefined')
      return

    const update = () => {
      set(getSystemDarkSnapshot())
    }
    update()
    return subscribeSystemDark(update)
  }
  return isSystemDarkAtom
}

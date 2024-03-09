import { atom } from 'jotai/vanilla'

import { getSnapshot, subscribe } from './use-system-dark'

export function atomSystemDark() {
  const isSystemDarkAtom = atom<boolean | null>(null)

  isSystemDarkAtom.onMount = (set) => {
    if (typeof window === 'undefined')
      return

    const update = () => {
      set(getSnapshot())
    }
    update()
    return subscribe(update)
  }
  return isSystemDarkAtom
}

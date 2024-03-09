import { atom } from 'jotai/vanilla'

export function atomSystemDark() {
  const isSystemDarkAtom = atom<boolean | null>(null)

  isSystemDarkAtom.onMount = (set) => {
    if (typeof window === 'undefined')
      return
    const matcher = window.matchMedia('(prefers-color-scheme: dark)')
    const update = () => {
      set(matcher.matches)
    }
    update()
    matcher.addEventListener('change', update)
    return () => {
      matcher.removeEventListener('change', update)
    }
  }
  return isSystemDarkAtom
}

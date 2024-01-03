import { useAtomValue } from "jotai/react"
import { atom } from "jotai/vanilla"
import { useMemo } from "react"

export function atomSystemDark() {
  const isSystemDarkAtom = atom<boolean | null>(null)
  isSystemDarkAtom.onMount = (set) => {
    if (typeof window === "undefined") return
    const matcher = window.matchMedia("(prefers-color-scheme: dark)")
    const update = () => {
      set(matcher.matches)
    }
    update()
    matcher.addEventListener("change", update)
    return () => {
      matcher.removeEventListener("change", update)
    }
  }
  return isSystemDarkAtom
}

export function useSystemDark() {
  const globalSystemDarkAtom = useMemo(() => atomSystemDark(), [])
  return useAtomValue(globalSystemDarkAtom)
}

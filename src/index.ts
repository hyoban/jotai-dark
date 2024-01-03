import { atomEffect } from "jotai-effect"
import { useAtomValue, useSetAtom } from "jotai/react"
import { atom } from "jotai/vanilla"
import { atomWithStorage } from "jotai/vanilla/utils"
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

const themeOptions = ["system", "light", "dark"] as const
export type Theme = (typeof themeOptions)[number]

function isDarkMode(setting?: Theme | null, isSystemDark?: boolean | null) {
  return setting === "dark" || (!!isSystemDark && setting !== "light")
}

export function atomDark(storageKey = "use-dark") {
  const isSystemDarkAtom = atomSystemDark()
  const themeAtom = atomWithStorage<Theme>(storageKey, "system")

  const isDarkAtom = atom((get) => {
    const theme = get(themeAtom)
    const isSystemDark = get(isSystemDarkAtom)
    return isDarkMode(theme, isSystemDark)
  })

  const toggleDarkEffect = atomEffect((get, set) => {
    const isDark = get(isDarkAtom)
    if (isDark) {
      document.documentElement.classList.toggle("dark", true)
    } else {
      document.documentElement.classList.toggle("dark", false)
    }

    const theme = get(themeAtom)
    const isSystemDark = get(isSystemDarkAtom)
    if (
      (theme === "dark" && isSystemDark) ||
      (theme === "light" && !isSystemDark)
    ) {
      set(themeAtom, "system")
    }
  })

  const anAtom = atom(
    (get) => {
      get(toggleDarkEffect)
      return get(isDarkAtom)
    },
    (get, set) => {
      const theme = get(themeAtom)
      const isSystemDark = get(isSystemDarkAtom)
      if (theme === "system") {
        set(themeAtom, isSystemDark ? "light" : "dark")
      } else {
        set(themeAtom, "system")
      }
    },
  )
  return anAtom
}

export function useSystemDark() {
  const globalSystemDarkAtom = useMemo(() => atomSystemDark(), [])
  return useAtomValue(globalSystemDarkAtom)
}

export function useDark(storageKey = "use-dark") {
  const globalIsDarkAtom = useMemo(() => atomDark(storageKey), [storageKey])
  const isDark = useAtomValue(globalIsDarkAtom)
  const toggleDark = useSetAtom(globalIsDarkAtom) as () => void
  return { isDark, toggleDark }
}

export { ThemeProvider } from "./theme-provider"

import { atomEffect } from "jotai-effect"
import { useAtomValue, useSetAtom } from "jotai/react"
import { atom } from "jotai/vanilla"
import { atomWithStorage } from "jotai/vanilla/utils"
import { useMemo } from "react"

import { atomSystemDark } from "./atom-system-dark"
import { disableAnimation, isDarkMode } from "./utils"

import type { Theme } from "./utils"

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
      const enable = disableAnimation()
      const theme = get(themeAtom)
      const isSystemDark = get(isSystemDarkAtom)
      if (theme === "system") {
        set(themeAtom, isSystemDark ? "light" : "dark")
      } else {
        set(themeAtom, "system")
      }
      enable()
    },
  )
  return anAtom
}

export function useDark(storageKey = "use-dark") {
  const globalIsDarkAtom = useMemo(() => atomDark(storageKey), [storageKey])
  const isDark = useAtomValue(globalIsDarkAtom)
  const toggleDark = useSetAtom(globalIsDarkAtom) as () => void
  return { isDark, toggleDark }
}

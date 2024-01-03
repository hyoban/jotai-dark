import { atomEffect } from "jotai-effect"
import { atom } from "jotai/vanilla"
import { atomWithStorage } from "jotai/vanilla/utils"

import { atomSystemDark } from "./atom-system-dark"
import { disableAnimation, isDarkMode } from "./utils"

import type { Options, Theme } from "./utils"

export function atomDark(options?: Options) {
  const {
    storageKey = "use-dark",
    disableTransition = false,
    disableTransitionExclude = [],
  } = options ?? {}

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
      const enable = disableTransition
        ? disableAnimation(disableTransitionExclude)
        : null
      const theme = get(themeAtom)
      const isSystemDark = get(isSystemDarkAtom)
      if (theme === "system") {
        set(themeAtom, isSystemDark ? "light" : "dark")
      } else {
        set(themeAtom, "system")
      }
      enable?.()
    },
  )
  return anAtom
}

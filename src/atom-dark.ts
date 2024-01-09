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
    applyDarkMode = (isDark: boolean) => {
      document.documentElement.classList.toggle("dark", isDark)
    },
  } = options ?? {}

  const isSystemDarkAtom = atomSystemDark()
  if (import.meta.env?.MODE !== "production") {
    isSystemDarkAtom.debugPrivate = true
  }
  const themeAtom = atomWithStorage<Theme>(storageKey, "system")
  if (import.meta.env?.MODE !== "production") {
    themeAtom.debugPrivate = true
  }

  const toggleDarkEffect = atomEffect((get, set) => {
    const theme = get(themeAtom)
    const isSystemDark = get(isSystemDarkAtom)
    const isDark = isDarkMode(theme, isSystemDark)
    applyDarkMode(isDark)

    if (
      (theme === "dark" && isSystemDark) ||
      (theme === "light" && !isSystemDark)
    ) {
      set(themeAtom, "system")
    }
  })
  if (import.meta.env?.MODE !== "production") {
    toggleDarkEffect.debugPrivate = true
  }

  const anAtom = atom(
    (get) => {
      get(toggleDarkEffect)
      const theme = get(themeAtom)
      const isSystemDark = get(isSystemDarkAtom)
      return isDarkMode(theme, isSystemDark)
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

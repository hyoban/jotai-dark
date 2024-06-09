import { useLocalStorage } from 'foxact/use-local-storage'
import { useEffect, useMemo } from 'react'

import type { Options, Theme } from '../utils'
import { disableAnimation, isDarkMode, mergeDefaultOptions } from '../utils'
import { useSystemDark } from './use-system-dark'

export function useDark(options?: Options) {
  const {
    storageKey,
    disableTransition,
    disableTransitionExclude,
    applyDarkMode,
  } = mergeDefaultOptions(options)

  const [theme, setTheme] = useLocalStorage<Theme>(storageKey, 'system')
  const isSystemDark = useSystemDark()

  const isDark = useMemo(
    () => isDarkMode(theme, isSystemDark),
    [isSystemDark, theme],
  )

  const toggleDark = () => {
    if (theme === 'system')
      setTheme(isSystemDark ? 'light' : 'dark')
    else setTheme('system')
  }

  useEffect(() => {
    const isDark = isDarkMode(theme, isSystemDark)
    const enable = disableTransition
      ? disableAnimation(disableTransitionExclude)
      : null
    applyDarkMode(isDark)
    enable?.()

    if (
      (theme === 'dark' && isSystemDark)
      || (theme === 'light' && !isSystemDark)
    ) {
      setTheme('system')
    }
  }, [theme, isSystemDark, setTheme, applyDarkMode, disableTransition, disableTransitionExclude])

  return { isDark, toggleDark }
}

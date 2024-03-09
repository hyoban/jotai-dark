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
    const enable = disableTransition
      ? disableAnimation(disableTransitionExclude)
      : null

    if (theme === 'system')
      setTheme(isSystemDark ? 'light' : 'dark')
    else setTheme('system')

    enable?.()
  }

  useEffect(() => {
    const isDark = isDarkMode(theme, isSystemDark)
    applyDarkMode(isDark)

    if (
      (theme === 'dark' && isSystemDark)
      || (theme === 'light' && !isSystemDark)
    )
      setTheme('system')
  }, [theme, isSystemDark, setTheme, applyDarkMode])

  return { isDark, toggleDark }
}

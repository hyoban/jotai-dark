export type Theme = 'system' | 'light' | 'dark'

export function isDarkMode(
  setting?: Theme | null,
  isSystemDark?: boolean | null,
) {
  return setting === 'dark' || (!!isSystemDark && setting !== 'light')
}

/**
 * credit: https://github.com/pacocoursey/next-themes/blob/cd67bfa20ef6ea78a814d65625c530baae4075ef/packages/next-themes/src/index.tsx#L285
 */
export function disableAnimation(disableTransitionExclude: string[] = []) {
  const css = document.createElement('style')
  css.append(
    document.createTextNode(
      `
*${disableTransitionExclude.map(s => `:not(${s})`).join('')} {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  -ms-transition: none !important;
  transition: none !important;
}
      `,
    ),
  )
  document.head.append(css)

  return () => {
    // Force restyle
    ;(() => window.getComputedStyle(document.body))()

    // Wait for next tick before removing
    setTimeout(() => {
      css.remove()
    }, 1)
  }
}

export interface Options {
  /**
   * @default "use-dark"
   */
  storageKey?: string

  /**
   * @default false
   */
  disableTransition?: boolean

  /**
   * @default []
   */
  disableTransitionExclude?: string[]

  /**
   * @default "class"
   */
  mode?: 'class' | 'data-theme'

  /**
   * @default `isDark => document.documentElement.classList.toggle("dark", isDark)` for mode "class"
   * @default `isDark => document.documentElement.dataset.theme = isDark ? "dark" : "light"` for mode "data-theme"
   */
  applyDarkMode?: (isDark: boolean) => void
}

export function mergeDefaultOptions(options?: Options): Required<Options> {
  return {
    storageKey: 'use-dark',
    disableTransition: false,
    disableTransitionExclude: [],
    mode: 'class',
    applyDarkMode: options?.mode === 'data-theme'
      ? (isDark) => {
          document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
        }
      : (isDark) => {
          document.documentElement.classList.toggle('dark', isDark)
        },
    ...options,
  }
}

const query = '(prefers-color-scheme: dark)'

export function getSystemDarkSnapshot() {
  return window.matchMedia(query).matches
}

export function subscribeSystemDark(callback: () => void) {
  const matcher = window.matchMedia(query)
  matcher.addEventListener('change', callback)
  return () => {
    matcher.removeEventListener('change', callback)
  }
}

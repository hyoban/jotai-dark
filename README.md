# jotai-dark

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]
[![code style: prettier][code-style-src]][code-style-href]

A Jōtai utility package for toggling dark mode

## Install

```bash
ni jotai jotai-effect jotai-dark
```

## Usage

```tsx
import { atomDark } from "jotai-dark"

const isDarkAtom = atomDark({
  // all options are optional (default values are shown)
  storageKey: "use-dark",
  disableTransition: false,
  disableTransitionExclude: [],
  applyDarkMode: (isDark: boolean) => {
    document.documentElement.classList.toggle("dark", isDark)
  },
})
```

## Snippets

`use-dark.ts`

```ts
import { useAtom } from "jotai"
import { atomDark } from "jotai-dark"

const isDarkAtom = atomDark({
  disableTransition: true,
  disableTransitionExclude: [".i-lucide-sun", ".i-lucide-moon"],
})

export function useDark() {
  const [isDark, setIsDark] = useAtom(isDarkAtom)
  return {
    isDark,
    toggleDark: setIsDark as () => void,
    theme: (isDark ? "dark" : "light") as "dark" | "light",
  }
}
```

`appearance-switch.tsx`

```tsx
"use client"

import { useDark } from "~/hooks/use-dark"

export function AppearanceSwitch({ className = "" }: { className?: string }) {
  const { toggleDark } = useDark()

  return (
    <button type="button" onClick={toggleDark} className={"flex " + className}>
      <div className="i-lucide-sun scale-100 dark:scale-0 transition-transform duration-500 rotate-0 dark:-rotate-90" />
      <div className="i-lucide-moon absolute scale-0 dark:scale-100 transition-transform duration-500 rotate-90 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
```

`layout.tsx`

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        {
          // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(){var e=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,t=localStorage.getItem("use-dark")||'"system"';('"dark"'===t||e&&'"light"'!==t)&&document.documentElement.classList.toggle("dark",!0)}();`,
            }}
          ></script>
        }
        {children}
      </body>
    </html>
  )
}
```

`index.html`

```html
<script>
  !(function () {
    var e =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches,
      t = localStorage.getItem("use-dark") || '"system"'
    ;('"dark"' === t || (e && '"light"' !== t)) &&
      document.documentElement.classList.toggle("dark", !0)
  })()
</script>
```

## React Only version

```ts
import { useLocalStorage } from "foxact/use-local-storage"
import { useEffect, useMemo, useSyncExternalStore } from "react"

const query = "(prefers-color-scheme: dark)"

function getSnapshot() {
  return window.matchMedia(query).matches
}

function getServerSnapshot(): undefined {
  return undefined
}

function subscribe(callback: () => void) {
  const matcher = window.matchMedia(query)
  matcher.addEventListener("change", callback)
  return () => {
    matcher.removeEventListener("change", callback)
  }
}

function useSystemDark() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/**
 * credit: https://github.com/pacocoursey/next-themes/blob/cd67bfa20ef6ea78a814d65625c530baae4075ef/packages/next-themes/src/index.tsx#L285
 */
function disableAnimation(disableTransitionExclude: string[] = []) {
  const css = document.createElement("style")
  css.append(
    document.createTextNode(
      `
*${disableTransitionExclude.map((s) => `:not(${s})`).join("")} {
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

const themeOptions = ["system", "light", "dark"] as const
type Theme = (typeof themeOptions)[number]

function isDarkMode(setting?: Theme | null, isSystemDark?: boolean | null) {
  return setting === "dark" || (!!isSystemDark && setting !== "light")
}

export type Options = {
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
   * @default isDark => document.documentElement.classList.toggle("dark", isDark)
   */
  applyDarkMode?: (isDark: boolean) => void
}

export function useDark(options?: Options) {
  const {
    storageKey = "use-dark",
    disableTransition = false,
    disableTransitionExclude = [],
    applyDarkMode = (isDark: boolean) => {
      document.documentElement.classList.toggle("dark", isDark)
    },
  } = options ?? {}

  const [theme, setTheme] = useLocalStorage<Theme>(storageKey, "system")
  const isSystemDark = useSystemDark()

  const isDark = useMemo(
    () => isDarkMode(theme, isSystemDark),
    [isSystemDark, theme],
  )

  const toggleDark = () => {
    const enable = disableTransition
      ? disableAnimation(disableTransitionExclude)
      : null

    if (theme === "system") setTheme(isSystemDark ? "light" : "dark")
    else setTheme("system")

    enable?.()
  }

  useEffect(() => {
    const isDark = isDarkMode(theme, isSystemDark)
    applyDarkMode(isDark)

    if (
      (theme === "dark" && isSystemDark) ||
      (theme === "light" && !isSystemDark)
    )
      setTheme("system")
  }, [theme, isSystemDark, setTheme])

  return { isDark, toggleDark }
}
```

## See also

- [jotai](https://github.com/pmndrs/jotai)
- [jotai-effect](https://github.com/jotaijs/jotai-effect)
- [next-themes](https://github.com/pacocoursey/next-themes)

## License

[MIT](./LICENSE) License © 2023-PRESENT [Stephen Zhou](https://github.com/hyoban)

<!-- Badges -->

[code-style-src]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat
[code-style-href]: https://github.com/prettier/prettier
[npm-version-src]: https://img.shields.io/npm/v/jotai-dark?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/jotai-dark
[npm-downloads-src]: https://img.shields.io/npm/dm/jotai-dark?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/jotai-dark
[bundle-src]: https://img.shields.io/bundlephobia/minzip/jotai-dark?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=jotai-dark
[license-src]: https://img.shields.io/github/license/hyoban/jotai-dark.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/hyoban/jotai-dark/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/jotai-dark

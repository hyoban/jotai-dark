# jotai-dark

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

A Jōtai utility package for toggling dark mode

## Install

```bash
ni jotai jotai-effect jotai-dark
```

## Usage

```tsx
import { atomDark } from 'jotai-dark'

const isDarkAtom = atomDark({
  // all options are optional (default values are shown)
  storageKey: 'use-dark',
  disableTransition: false,
  disableTransitionExclude: [],
  applyDarkMode: (isDark: boolean) => {
    document.documentElement.classList.toggle('dark', isDark)
  },
})
```

## Snippets

`use-dark.ts`

```ts
import { useAtom } from 'jotai'
import { atomDark } from 'jotai-dark'

const isDarkAtom = atomDark({
  disableTransition: true,
  disableTransitionExclude: ['.i-lucide-sun', '.i-lucide-moon'],
})

export function useDark() {
  const [isDark, setIsDark] = useAtom(isDarkAtom)
  return {
    isDark,
    toggleDark: setIsDark as () => void,
    theme: (isDark ? 'dark' : 'light') as 'dark' | 'light',
  }
}
```

`appearance-switch.tsx`

```tsx
'use client'

import { useDark } from '~/hooks/use-dark'

export function AppearanceSwitch({ className = '' }: { className?: string }) {
  const { toggleDark } = useDark()

  return (
    <button
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      type="button"
      onClick={toggleDark}
      className={`flex ${className}`}
    >
      <div
        role="img"
        aria-hidden="true"
        className="i-lucide-sun scale-100 dark:scale-0 transition-transform duration-500 rotate-0 dark:-rotate-90"
      />
      <div
        role="img"
        aria-hidden="true"
        className="i-lucide-moon absolute scale-0 dark:scale-100 transition-transform duration-500 rotate-90 dark:rotate-0"
      />
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
        window.matchMedia('(prefers-color-scheme: dark)').matches,
      t = localStorage.getItem('use-dark') || '"system"'
    ;('"dark"' === t || (e && '"light"' !== t)) &&
      document.documentElement.classList.toggle('dark', !0)
  })()
</script>
```

## See also

- [jotai](https://github.com/pmndrs/jotai)
- [jotai-effect](https://github.com/jotaijs/jotai-effect)
- [next-themes](https://github.com/pacocoursey/next-themes)

<!-- Badges -->

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

# jotai-dark

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]
[![code style: prettier][code-style-src]][code-style-href]

useDark function for React with Jotai

## Usage

`useDark`

```tsx
import { useDark } from "jotai-dark"

const { isDark, toggleDark } = useDark()
```

`ThemeProvider`

```tsx
import { ThemeProvider } from "jotai-dark"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

## Snippets

Sync theme for `index.html`

```html
<script>
  !(function () {
    var e =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches,
      t = localStorage.getItem("use-dark") || "system"
    ;('"dark"' === t || (e && '"light"' !== t)) &&
      document.documentElement.classList.toggle("dark", !0)
  })()
</script>
```

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

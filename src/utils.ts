export type Theme = "system" | "light" | "dark"

export function isDarkMode(
  setting?: Theme | null,
  isSystemDark?: boolean | null,
) {
  return setting === "dark" || (!!isSystemDark && setting !== "light")
}

/**
 * credit: https://github.com/pacocoursey/next-themes/blob/cd67bfa20ef6ea78a814d65625c530baae4075ef/packages/next-themes/src/index.tsx#L285
 */
export function disableAnimation() {
  const css = document.createElement("style")
  css.append(
    document.createTextNode(
      `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
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

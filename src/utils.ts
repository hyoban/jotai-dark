export type Theme = "system" | "light" | "dark"

export function isDarkMode(
  setting?: Theme | null,
  isSystemDark?: boolean | null,
) {
  return setting === "dark" || (!!isSystemDark && setting !== "light")
}

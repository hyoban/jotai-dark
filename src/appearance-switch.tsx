import { useDark } from "."

export function AppearanceSwitch() {
  const { isDark, toggleDark } = useDark()

  return (
    <button onClick={toggleDark} data-testid="appearance-switch">
      {isDark ? "Dark" : "Light"}
    </button>
  )
}

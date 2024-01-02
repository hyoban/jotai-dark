import { useDark } from "."

export function AppearanceSwitch() {
  const { isDark, toggleDark } = useDark()

  return <button onClick={toggleDark}>{isDark ? "Dark" : "Light"}</button>
}

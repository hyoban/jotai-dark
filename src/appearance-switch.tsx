import { useAtomValue, useSetAtom } from "jotai"

import { atomDark } from "./atom-dark"

const isDarkAtom = atomDark()

function useDark() {
  const isDark = useAtomValue(isDarkAtom)
  const toggleDark = useSetAtom(isDarkAtom) as () => void
  return { isDark, toggleDark }
}

export function AppearanceSwitch() {
  const { isDark, toggleDark } = useDark()

  return <button onClick={toggleDark}>{isDark ? "Dark" : "Light"}</button>
}

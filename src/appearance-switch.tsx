import { useAtomValue, useSetAtom } from "jotai"

import { atomDark } from "."

const isDarkAtom = atomDark({
  disableTransition: true,
  disableTransitionExclude: [".i-lucide-sun", ".i-lucide-moon"],
})

function useDark() {
  const isDark = useAtomValue(isDarkAtom)
  const toggleDark = useSetAtom(isDarkAtom) as () => void
  return { isDark, toggleDark }
}

export function AppearanceSwitch() {
  const { isDark, toggleDark } = useDark()

  return <button onClick={toggleDark}>{isDark ? "Dark" : "Light"}</button>
}

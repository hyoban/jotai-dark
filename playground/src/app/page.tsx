'use client'

import { useAtomValue, useSetAtom } from 'jotai'
import { atomDark } from 'jotai-dark'

const isDarkAtom = atomDark({
  disableTransition: true,
  disableTransitionExclude: ['.i-lucide-sun', '.i-lucide-moon'],
})

function useDark() {
  const isDark = useAtomValue(isDarkAtom)
  const toggleDark = useSetAtom(isDarkAtom) as () => void
  return { isDark, toggleDark }
}

export default function HomePage() {
  const { toggleDark } = useDark()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <button type="button" onClick={toggleDark} className="flex">
        <div className="i-lucide-sun scale-100 dark:scale-0 transition-transform duration-500 rotate-0 dark:-rotate-90" />
        <div className="i-lucide-moon absolute scale-0 dark:scale-100 transition-transform duration-500 rotate-90 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </button>
    </div>
  )
}

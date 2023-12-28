"use client"

import { useDark } from "jotai-dark"

export default function HomePage() {
  const { isDark, toggleDark } = useDark()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <button onClick={toggleDark}>{isDark ? "Dark" : "Light"}</button>
    </div>
  )
}

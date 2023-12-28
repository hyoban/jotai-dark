import { iconsPlugin } from "@egoist/tailwindcss-icons"
import { type Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

export default {
  darkMode: "class",
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    iconsPlugin({
      scale: 1.5,
    }),
  ],
} satisfies Config

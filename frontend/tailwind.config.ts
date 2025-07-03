import type { Config } from "tailwindcss";
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sectionDark: "#191d24",
        sectionLight: "#f3f4f6",
      },
      fontFamily: {
        sans: ['Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial', ...fontFamily.sans],
      },
      screens: {
        sm: { max: '639px' }, // Applies to screens 640px and smaller
        md: { max: '767px' }, // Applies to screens 768px and smaller
        lg: { max: '1023px' }, // Applies to screens 1024px and smaller
        xl: { max: '1279px' }, // Applies to screens 1280px and smaller
      },
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        primary: "#4A90E2",
        secondary: "#333333",
        text: "#EAEAEA",
        blur: '#9e9e9e',
        chat: "#1a1a1a",
        chatBackground: '#282828'
      },
    },
  },
  plugins: [],
} satisfies Config;

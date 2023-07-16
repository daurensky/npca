import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Lora", "serif"],
        body: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark: {
          light: "#2C2A2F50",
          regular: "#37353A",
          bold: "#2C2A2F",
        },
        white: {
          "extra-light": "#ffffff35",
          light: "#ffffff50",
          "semi-light": "#ffffff60",
          regular: "#ffffff",
        },
        yellow: {
          light: "#D2BF9D50",
          regular: "#D2BF9D",
        },
      },
    },
  },
  plugins: [],
}
export default config

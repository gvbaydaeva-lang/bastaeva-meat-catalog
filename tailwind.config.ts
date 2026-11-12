import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#20201E",
        cream: "#F7F3EC",
        terracotta: "#B85C42",
        sage: "#66705B",
        line: "#DFD8CD"
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        sans: ["Arial", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(32, 32, 30, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;

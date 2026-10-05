import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f1115",
        murmur: { 400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed" },
      },
    },
  },
  plugins: [],
};

export default config;

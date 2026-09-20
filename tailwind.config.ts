import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#070709",
          50: "#16161C",
          100: "#101014",
          200: "#0C0C10",
        },
        paper: {
          DEFAULT: "#F4F0E6",
          muted: "#A39E93",
          dim: "#6E6A62",
        },
        gold: {
          DEFAULT: "#E8C547",
          dim: "#B4922A",
          glow: "#F3D86A",
        },
        ember: "#F27A3A",
        mint: "#3DDC97",
        frost: "#7B8CFF",
        coral: "#FF7A59",
      },
      fontFamily: {
        display: ["var(--font-display)", "Oswald", "sans-serif"],
        sans: ["var(--font-sans)", "Manrope", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(232, 197, 71, 0.35)",
        card: "0 12px 40px -16px rgba(0, 0, 0, 0.65)",
      },
      maxWidth: {
        phone: "430px",
      },
    },
  },
  plugins: [],
};

export default config;

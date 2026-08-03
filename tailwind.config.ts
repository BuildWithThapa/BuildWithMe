import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0E14",
          50: "#F5F6F8",
          100: "#E9EBEF",
          800: "#131826",
          900: "#0B0E14",
          950: "#06080D"
        },
        paper: {
          DEFAULT: "#FAFAF9",
          100: "#F4F4F3"
        },
        signal: {
          DEFAULT: "#4F7CFF",
          50: "#EEF2FF",
          400: "#7C9CFF",
          500: "#4F7CFF",
          600: "#3A5FE0",
          700: "#2C48B3"
        },
        success: "#22C55E",
        warning: "#F59E0B",
        muted: "#94A3B8"
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      backgroundImage: {
        "signal-gradient": "linear-gradient(135deg, #4F7CFF 0%, #7C9CFF 100%)"
      },
      keyframes: {
        caret: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        caret: "caret 1s step-end infinite",
        "fade-up": "fade-up 0.6s ease-out forwards"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};

export default config;

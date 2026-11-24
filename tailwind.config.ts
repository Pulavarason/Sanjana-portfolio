import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        bg2: "var(--bg2)",
        card: "var(--card)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        line: "var(--line)",
        cream: "#F5F0E8",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"DM Sans Variable"', '"DM Sans"', "system-ui", "sans-serif"],
      },
      keyframes: {
        kenburns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.09)" },
        },
        scrollLine: {
          "0%": { transform: "translateY(-100%)" },
          "60%, 100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        kenburns: "kenburns 26s ease-out forwards",
        scrollLine: "scrollLine 2.2s cubic-bezier(0.65,0,0.35,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;

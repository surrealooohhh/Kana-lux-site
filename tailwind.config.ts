import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" }
      },
      boxShadow: { glow: "0 0 34px rgba(34, 211, 238, 0.28)", glass: "0 24px 80px rgba(16, 24, 40, 0.16)" },
      keyframes: {
        aurora: {
          "0%,100%": { transform: "translate3d(-5%, -4%, 0) rotate(0deg) scale(1)" },
          "50%": { transform: "translate3d(5%, 5%, 0) rotate(8deg) scale(1.08)" }
        },
        shimmer: { "0%": { backgroundPosition: "0% 50%" }, "100%": { backgroundPosition: "200% 50%" } }
      },
      animation: { aurora: "aurora 18s ease-in-out infinite", shimmer: "shimmer 6s linear infinite" }
    }
  },
  plugins: [animate]
};
export default config;

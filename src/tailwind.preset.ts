import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

const preset: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/formly-reactjs/dist/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    // Dynamic color patterns using regex
    {
      pattern:
        /^bg-(primary|secondary|background|destructive|muted|accent|popover|card)$/,
    },
    {
      pattern: /^bg-(primary|secondary|destructive|muted|accent)\/90$/,
    },
    {
      pattern:
        /^text-(primary|secondary|background|foreground|destructive|muted|accent|popover|card)$/,
    },
    {
      pattern:
        /^text-(primary|secondary|destructive|muted|accent|popover|card)-foreground$/,
    },
    {
      pattern:
        /^border-(border|input|primary|secondary|destructive|muted|accent)$/,
    },
    {
      pattern: /^ring-(ring|primary|secondary|destructive)$/,
    },
    {
      pattern: /^ring-offset-(background|2)$/,
    },
    // Interactive state patterns
    {
      pattern:
        /^(focus|focus-visible):(ring-2|ring-ring|ring-offset-2|outline-none)$/,
    },
    {
      pattern: /^hover:bg-(primary|secondary|destructive|muted|accent)\/90$/,
    },
    {
      pattern: /^disabled:(cursor-not-allowed|opacity-50|pointer-events-none)$/,
    },
    {
      pattern: /^peer-disabled:(cursor-not-allowed|opacity-70)$/,
    },
    // File input patterns
    {
      pattern: /^file:(border-0|bg-transparent|text-sm|font-medium)$/,
    },
    // Placeholder pattern
    {
      pattern: /^placeholder:text-muted-foreground$/,
    },
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [forms, typography],
} as const;

export default preset;

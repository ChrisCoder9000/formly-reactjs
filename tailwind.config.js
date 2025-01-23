/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
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
        ...colors,
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
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  safelist: [
    // Layout
    "rounded-md",
    "border",
    "h-10",
    "px-3",
    "py-2",
    "flex",
    "min-h-[80px]",
    "w-full",
    "items-center",
    "justify-between",
    "font-medium",
    "leading-none",
    "text-sm",

    // Colors
    "border-border",
    "border-input",
    "bg-background",
    "bg-primary",
    "bg-secondary",
    "bg-muted",
    "bg-accent",
    "bg-popover",
    "bg-card",
    "text-foreground",
    "text-primary",
    "text-primary-foreground",
    "text-secondary",
    "text-secondary-foreground",
    "text-muted",
    "text-muted-foreground",
    "text-accent",
    "text-accent-foreground",
    "text-destructive",
    "text-destructive-foreground",
    "ring-offset-background",

    // Default Tailwind Colors (common ones)
    {
      pattern:
        /^(bg|text|border)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)(\/[0-9]+)?$/,
    },

    // States
    "file:bg-transparent",
    "placeholder:text-muted-foreground",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "peer-disabled:cursor-not-allowed",
    "peer-disabled:opacity-70",

    // Hover states for default colors
    "hover:bg-slate-100",
    "hover:bg-slate-200",
    "hover:bg-slate-300",
    "hover:bg-slate-400",
    "hover:bg-slate-500",
    "hover:bg-red-100",
    "hover:bg-red-200",
    "hover:bg-red-300",
    "hover:bg-red-400",
    "hover:bg-red-500",
    "hover:bg-blue-100",
    "hover:bg-blue-200",
    "hover:bg-blue-300",
    "hover:bg-blue-400",
    "hover:bg-blue-500",
    "hover:bg-green-100",
    "hover:bg-green-200",
    "hover:bg-green-300",
    "hover:bg-green-400",
    "hover:bg-green-500",

    // Hover states with opacity
    "hover:bg-slate-100/10",
    "hover:bg-slate-200/20",
    "hover:bg-slate-300/30",
    "hover:bg-slate-400/40",
    "hover:bg-slate-500/50",
    "hover:bg-red-100/10",
    "hover:bg-red-200/20",
    "hover:bg-red-300/30",
    "hover:bg-red-400/40",
    "hover:bg-red-500/50",

    // Hover states for theme colors
    "hover:bg-primary",
    "hover:bg-secondary",
    "hover:bg-muted",
    "hover:bg-accent",
    "hover:bg-background",
    "hover:bg-foreground",
    "hover:bg-card",
    "hover:bg-popover",
    "hover:bg-border",
    "hover:bg-input",
    "hover:bg-ring",
    "hover:bg-primary/90",
    "hover:bg-secondary/80",
    "hover:bg-muted/50",
    "hover:bg-accent/80",

    // Dark mode
    "dark:bg-background",
    "dark:text-foreground",
    "dark:border-border",
    "dark:hover:bg-primary/80",
    "dark:hover:bg-secondary/80",
  ],
};

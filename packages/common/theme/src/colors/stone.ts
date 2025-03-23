const stone = {
  inlineColors: {
    light: {
      background: "white",
      foreground: "stone-950",
      card: "white",
      "card-foreground": "stone-950",
      popover: "white",
      "popover-foreground": "stone-950",
      primary: "stone-900",
      "primary-foreground": "stone-50",
      secondary: "stone-100",
      "secondary-foreground": "stone-900",
      muted: "stone-100",
      "muted-foreground": "stone-500",
      accent: "stone-100",
      "accent-foreground": "stone-900",
      destructive: "red-500",
      "destructive-foreground": "stone-50",
      border: "stone-200",
      input: "stone-200",
      ring: "stone-950",
    },
    dark: {
      background: "stone-950",
      foreground: "stone-50",
      card: "stone-950",
      "card-foreground": "stone-50",
      popover: "stone-950",
      "popover-foreground": "stone-50",
      primary: "stone-50",
      "primary-foreground": "stone-900",
      secondary: "stone-800",
      "secondary-foreground": "stone-50",
      muted: "stone-800",
      "muted-foreground": "stone-400",
      accent: "stone-800",
      "accent-foreground": "stone-50",
      destructive: "red-900",
      "destructive-foreground": "stone-50",
      border: "stone-800",
      input: "stone-800",
      ring: "stone-300",
    },
  },
  cssVars: {
    light: {
      background: "0 0% 100%",
      foreground: "20 14.3% 4.1%",
      card: "0 0% 100%",
      "card-foreground": "20 14.3% 4.1%",
      popover: "0 0% 100%",
      "popover-foreground": "20 14.3% 4.1%",
      primary: "24 9.8% 10%",
      "primary-foreground": "60 9.1% 97.8%",
      secondary: "60 4.8% 95.9%",
      "secondary-foreground": "24 9.8% 10%",
      muted: "60 4.8% 95.9%",
      "muted-foreground": "25 5.3% 44.7%",
      accent: "60 4.8% 95.9%",
      "accent-foreground": "24 9.8% 10%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "60 9.1% 97.8%",
      border: "20 5.9% 90%",
      input: "20 5.9% 90%",
      ring: "20 14.3% 4.1%",
      "chart-1": "12 76% 61%",
      "chart-2": "173 58% 39%",
      "chart-3": "197 37% 24%",
      "chart-4": "43 74% 66%",
      "chart-5": "27 87% 67%",
    },
    dark: {
      background: "20 14.3% 4.1%",
      foreground: "60 9.1% 97.8%",
      card: "20 14.3% 4.1%",
      "card-foreground": "60 9.1% 97.8%",
      popover: "20 14.3% 4.1%",
      "popover-foreground": "60 9.1% 97.8%",
      primary: "60 9.1% 97.8%",
      "primary-foreground": "24 9.8% 10%",
      secondary: "12 6.5% 15.1%",
      "secondary-foreground": "60 9.1% 97.8%",
      muted: "12 6.5% 15.1%",
      "muted-foreground": "24 5.4% 63.9%",
      accent: "12 6.5% 15.1%",
      "accent-foreground": "60 9.1% 97.8%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "60 9.1% 97.8%",
      border: "12 6.5% 15.1%",
      input: "12 6.5% 15.1%",
      ring: "24 5.7% 82.9%",
      "chart-1": "220 70% 50%",
      "chart-2": "160 60% 45%",
      "chart-3": "30 80% 55%",
      "chart-4": "280 65% 60%",
      "chart-5": "340 75% 55%",
    },
  },
  cssVarsV4: {
    light: {
      background: "oklch(1 0 0)", // --color-white
      foreground: "oklch(0.147 0.004 49.25)", // --color-stone-950
      card: "oklch(1 0 0)", // --color-white
      "card-foreground": "oklch(0.147 0.004 49.25)", // --color-stone-950
      popover: "oklch(1 0 0)", // --color-white
      "popover-foreground": "oklch(0.147 0.004 49.25)", // --color-stone-950
      primary: "oklch(0.216 0.006 56.043)", // --color-stone-900
      "primary-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      secondary: "oklch(0.97 0.001 106.424)", // --color-stone-100
      "secondary-foreground": "oklch(0.216 0.006 56.043)", // --color-stone-900
      muted: "oklch(0.97 0.001 106.424)", // --color-stone-100
      "muted-foreground": "oklch(0.553 0.013 58.071)", // --color-stone-500
      accent: "oklch(0.97 0.001 106.424)", // --color-stone-100
      "accent-foreground": "oklch(0.216 0.006 56.043)", // --color-stone-900
      destructive: "oklch(0.577 0.245 27.325)", // --color-red-600
      "destructive-foreground": "oklch(0.577 0.245 27.325)", // --color-red-600
      border: "oklch(0.923 0.003 48.717)", // --color-stone-200
      input: "oklch(0.923 0.003 48.717)", // --color-stone-200
      ring: "oklch(0.869 0.005 56.366)", // --color-stone-300
      "chart-1": "oklch(0.646 0.222 41.116)", // --color-orange-600
      "chart-2": "oklch(0.6 0.118 184.704)", // --color-teal-600
      "chart-3": "oklch(0.398 0.07 227.392)", // --color-cyan-900
      "chart-4": "oklch(0.828 0.189 84.429)", // --color-amber-400
      "chart-5": "oklch(0.769 0.188 70.08)", // --color-amber-500
      radius: "0.625rem", // Not a color
      sidebar: "oklch(0.985 0.001 106.423)", // --color-stone-50
      "sidebar-foreground": "oklch(0.147 0.004 49.25)", // --color-stone-950
      "sidebar-primary": "oklch(0.216 0.006 56.043)", // --color-stone-900
      "sidebar-primary-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      "sidebar-accent": "oklch(0.97 0.001 106.424)", // --color-stone-100
      "sidebar-accent-foreground": "oklch(0.216 0.006 56.043)", // --color-stone-900
      "sidebar-border": "oklch(0.923 0.003 48.717)", // --color-stone-200
      "sidebar-ring": "oklch(0.869 0.005 56.366)", // --color-stone-300
    },
    dark: {
      background: "oklch(0.147 0.004 49.25)", // --color-stone-950
      foreground: "oklch(0.985 0.001 106.423)", // --color-stone-50
      card: "oklch(0.147 0.004 49.25)", // --color-stone-950
      "card-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      popover: "oklch(0.147 0.004 49.25)", // --color-stone-950
      "popover-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      primary: "oklch(0.985 0.001 106.423)", // --color-stone-50
      "primary-foreground": "oklch(0.216 0.006 56.043)", // --color-stone-900
      secondary: "oklch(0.268 0.007 34.298)", // --color-stone-800
      "secondary-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      muted: "oklch(0.268 0.007 34.298)", // --color-stone-800
      "muted-foreground": "oklch(0.709 0.01 56.259)", // --color-stone-400
      accent: "oklch(0.268 0.007 34.298)", // --color-stone-800
      "accent-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      destructive: "oklch(0.396 0.141 25.723)", // --color-red-900
      "destructive-foreground": "oklch(0.637 0.237 25.331)", // --color-red-500
      border: "oklch(0.268 0.007 34.298)", // --color-stone-800
      input: "oklch(0.268 0.007 34.298)", // --color-stone-800
      ring: "oklch(0.553 0.013 58.071)", // --color-stone-500
      "chart-1": "oklch(0.488 0.243 264.376)", // --color-blue-700
      "chart-2": "oklch(0.696 0.17 162.48)", // --color-emerald-500
      "chart-3": "oklch(0.769 0.188 70.08)", // --color-amber-500
      "chart-4": "oklch(0.627 0.265 303.9)", // --color-purple-500
      "chart-5": "oklch(0.645 0.246 16.439)", // --color-rose-500
      sidebar: "oklch(0.216 0.006 56.043)", // --color-stone-900
      "sidebar-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      "sidebar-primary": "oklch(0.488 0.243 264.376)", // --color-blue-700
      "sidebar-primary-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      "sidebar-accent": "oklch(0.268 0.007 34.298)", // --color-stone-800
      "sidebar-accent-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      "sidebar-border": "oklch(0.268 0.007 34.298)", // --color-stone-800
      "sidebar-ring": "oklch(0.553 0.013 58.071)", // --color-stone-600
    },
  },
  inlineColorsTemplate:
    "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n  ",
  cssVarsTemplate:
    "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer base {\n  :root {\n    --background: 0 0% 100%;\n    --foreground: 20 14.3% 4.1%;\n    --card: 0 0% 100%;\n    --card-foreground: 20 14.3% 4.1%;\n    --popover: 0 0% 100%;\n    --popover-foreground: 20 14.3% 4.1%;\n    --primary: 24 9.8% 10%;\n    --primary-foreground: 60 9.1% 97.8%;\n    --secondary: 60 4.8% 95.9%;\n    --secondary-foreground: 24 9.8% 10%;\n    --muted: 60 4.8% 95.9%;\n    --muted-foreground: 25 5.3% 44.7%;\n    --accent: 60 4.8% 95.9%;\n    --accent-foreground: 24 9.8% 10%;\n    --destructive: 0 84.2% 60.2%;\n    --destructive-foreground: 60 9.1% 97.8%;\n    --border: 20 5.9% 90%;\n    --input: 20 5.9% 90%;\n    --ring: 20 14.3% 4.1%;\n    --radius: 0.5rem;\n    --chart-1: 12 76% 61%;\n    --chart-2: 173 58% 39%;\n    --chart-3: 197 37% 24%;\n    --chart-4: 43 74% 66%;\n    --chart-5: 27 87% 67%;\n  }\n\n  .dark {\n    --background: 20 14.3% 4.1%;\n    --foreground: 60 9.1% 97.8%;\n    --card: 20 14.3% 4.1%;\n    --card-foreground: 60 9.1% 97.8%;\n    --popover: 20 14.3% 4.1%;\n    --popover-foreground: 60 9.1% 97.8%;\n    --primary: 60 9.1% 97.8%;\n    --primary-foreground: 24 9.8% 10%;\n    --secondary: 12 6.5% 15.1%;\n    --secondary-foreground: 60 9.1% 97.8%;\n    --muted: 12 6.5% 15.1%;\n    --muted-foreground: 24 5.4% 63.9%;\n    --accent: 12 6.5% 15.1%;\n    --accent-foreground: 60 9.1% 97.8%;\n    --destructive: 0 62.8% 30.6%;\n    --destructive-foreground: 60 9.1% 97.8%;\n    --border: 12 6.5% 15.1%;\n    --input: 12 6.5% 15.1%;\n    --ring: 24 5.7% 82.9%;\n    --chart-1: 220 70% 50%;\n    --chart-2: 160 60% 45%;\n    --chart-3: 30 80% 55%;\n    --chart-4: 280 65% 60%;\n    --chart-5: 340 75% 55%;\n  }\n}\n\n@layer base {\n  * {\n    @apply border-border;\n  }\n  body {\n    @apply bg-background text-foreground;\n  }\n}",
};

export default stone;

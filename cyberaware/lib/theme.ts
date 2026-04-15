/**
 * Shared style constants using CSS custom properties.
 * All values resolve via globals.css — dark & light mode handled automatically.
 */
export const S = {
  // Core backgrounds
  bg:       "var(--bg)",
  surface:  "var(--surface)",
  surface2: "var(--surface-2)",
  surface3: "var(--surface-3)",

  // Accent
  accent:     "var(--accent)",       // for fills / backgrounds
  accentLight:"var(--accent-light)", // lighter accent
  accentText: "var(--accent-text)",  // for text in accent color
  accentFg:   "var(--accent-fg)",    // text ON an accent-colored background
  accentDim:  "var(--accent-dim)",
  accentDim2: "var(--accent-dim2)",
  accentDim3: "var(--accent-dim3)",

  // Text
  text:  "var(--text)",
  text2: "var(--text-2)",
  text3: "var(--text-3)",

  // Borders
  border:  "var(--border)",
  border2: "var(--border-2)",

  // Semantic
  green:    "var(--green)",
  greenDim: "var(--green-dim)",
  greenDim2:"var(--green-dim2)",
  red:      "var(--red)",
  redDim:   "var(--red-dim)",
  redDim2:  "var(--red-dim2)",
  amber:    "var(--amber)",
  amberDim: "var(--amber-dim)",
  amberDim2:"var(--amber-dim2)",

  shadow: "var(--shadow)",
} as const;

// ─── Token Interfaces ─────────────────────────────────────────────────────────

export interface ThemeColors {
  // Surface
  background: string;
  foreground: string;
  // Brand
  primary: string;
  primaryForeground: string;
  // Secondary surface
  secondary: string;
  secondaryForeground: string;
  // Muted surface
  muted: string;
  mutedForeground: string;
  // Accent / hover surface
  accent: string;
  accentForeground: string;
  // Semantic states
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  danger: string;
  dangerForeground: string;
  // Form / input
  border: string;
  input: string;
  ring: string;
  // Popover / overlay
  popover: string;
  popoverForeground: string;
}

export interface Theme {
  name: string;
  label: string;
  colors: ThemeColors;
}

export type BuiltInThemeName = 'indigo' | 'blue' | 'violet' | 'rose' | 'emerald' | 'orange' | 'slate';

// ─── Built-in Themes ──────────────────────────────────────────────────────────

export const themes: Theme[] = [
  {
    name: 'indigo',
    label: 'Indigo (Default)',
    colors: {
      background: '#ffffff',
      foreground: '#0f172a',
      primary: '#2f27ce',
      primaryForeground: '#ffffff',
      secondary: '#dedcff',
      secondaryForeground: '#2f27ce',
      muted: '#f8fafc',
      mutedForeground: '#64748b',
      accent: '#f1f5f9',
      accentForeground: '#0f172a',
      success: '#10b981',
      successForeground: '#ffffff',
      warning: '#f59e0b',
      warningForeground: '#ffffff',
      danger: '#ef4444',
      dangerForeground: '#ffffff',
      border: '#e2e8f0',
      input: '#e2e8f0',
      ring: '#2f27ce',
      popover: '#ffffff',
      popoverForeground: '#0f172a',
    },
  },
  {
    name: 'blue',
    label: 'Blue',
    colors: {
      background: '#ffffff',
      foreground: '#0f172a',
      primary: '#3b82f6',
      primaryForeground: '#ffffff',
      secondary: '#dbeafe',
      secondaryForeground: '#1d4ed8',
      muted: '#f8fafc',
      mutedForeground: '#64748b',
      accent: '#eff6ff',
      accentForeground: '#1e40af',
      success: '#10b981',
      successForeground: '#ffffff',
      warning: '#f59e0b',
      warningForeground: '#ffffff',
      danger: '#ef4444',
      dangerForeground: '#ffffff',
      border: '#e2e8f0',
      input: '#e2e8f0',
      ring: '#3b82f6',
      popover: '#ffffff',
      popoverForeground: '#0f172a',
    },
  },
  {
    name: 'violet',
    label: 'Violet',
    colors: {
      background: '#ffffff',
      foreground: '#1e1b4b',
      primary: '#7c3aed',
      primaryForeground: '#ffffff',
      secondary: '#ede9fe',
      secondaryForeground: '#5b21b6',
      muted: '#f5f3ff',
      mutedForeground: '#6d28d9',
      accent: '#f5f3ff',
      accentForeground: '#4c1d95',
      success: '#10b981',
      successForeground: '#ffffff',
      warning: '#f59e0b',
      warningForeground: '#ffffff',
      danger: '#ef4444',
      dangerForeground: '#ffffff',
      border: '#ddd6fe',
      input: '#ddd6fe',
      ring: '#7c3aed',
      popover: '#ffffff',
      popoverForeground: '#1e1b4b',
    },
  },
  {
    name: 'rose',
    label: 'Rose',
    colors: {
      background: '#ffffff',
      foreground: '#18181b',
      primary: '#e11d48',
      primaryForeground: '#ffffff',
      secondary: '#ffe4e6',
      secondaryForeground: '#9f1239',
      muted: '#fff1f2',
      mutedForeground: '#64748b',
      accent: '#fff1f2',
      accentForeground: '#881337',
      success: '#10b981',
      successForeground: '#ffffff',
      warning: '#f59e0b',
      warningForeground: '#ffffff',
      danger: '#ef4444',
      dangerForeground: '#ffffff',
      border: '#fecdd3',
      input: '#fecdd3',
      ring: '#e11d48',
      popover: '#ffffff',
      popoverForeground: '#18181b',
    },
  },
  {
    name: 'emerald',
    label: 'Emerald',
    colors: {
      background: '#ffffff',
      foreground: '#064e3b',
      primary: '#059669',
      primaryForeground: '#ffffff',
      secondary: '#d1fae5',
      secondaryForeground: '#065f46',
      muted: '#ecfdf5',
      mutedForeground: '#064748b',
      accent: '#ecfdf5',
      accentForeground: '#065f46',
      success: '#10b981',
      successForeground: '#ffffff',
      warning: '#f59e0b',
      warningForeground: '#ffffff',
      danger: '#ef4444',
      dangerForeground: '#ffffff',
      border: '#a7f3d0',
      input: '#a7f3d0',
      ring: '#059669',
      popover: '#ffffff',
      popoverForeground: '#064e3b',
    },
  },
  {
    name: 'orange',
    label: 'Orange',
    colors: {
      background: '#ffffff',
      foreground: '#1c1917',
      primary: '#ea580c',
      primaryForeground: '#ffffff',
      secondary: '#ffedd5',
      secondaryForeground: '#9a3412',
      muted: '#fff7ed',
      mutedForeground: '#64748b',
      accent: '#fff7ed',
      accentForeground: '#7c2d12',
      success: '#10b981',
      successForeground: '#ffffff',
      warning: '#f59e0b',
      warningForeground: '#ffffff',
      danger: '#ef4444',
      dangerForeground: '#ffffff',
      border: '#fed7aa',
      input: '#fed7aa',
      ring: '#ea580c',
      popover: '#ffffff',
      popoverForeground: '#1c1917',
    },
  },
  {
    name: 'slate',
    label: 'Slate',
    colors: {
      background: '#ffffff',
      foreground: '#0f172a',
      primary: '#475569',
      primaryForeground: '#ffffff',
      secondary: '#f1f5f9',
      secondaryForeground: '#0f172a',
      muted: '#f8fafc',
      mutedForeground: '#64748b',
      accent: '#f1f5f9',
      accentForeground: '#0f172a',
      success: '#10b981',
      successForeground: '#ffffff',
      warning: '#f59e0b',
      warningForeground: '#ffffff',
      danger: '#ef4444',
      dangerForeground: '#ffffff',
      border: '#e2e8f0',
      input: '#e2e8f0',
      ring: '#475569',
      popover: '#ffffff',
      popoverForeground: '#0f172a',
    },
  },
];

// ─── Apply Theme ──────────────────────────────────────────────────────────────

const THEME_STYLE_ID = 'basuicn-theme';

/**
 * Applies a theme by injecting a <style> tag at the START of <head>.
 *
 * Why <style> tag instead of element.style.setProperty():
 *   Inline styles have the highest CSS specificity and would override
 *   .dark { } class rules, breaking dark mode. A <style> tag injected
 *   before the app's CSS bundle has lower specificity than .dark { }
 *   rules defined later in the bundle — so dark mode always wins.
 */
export function applyTheme(theme: Theme) {
  if (typeof window === 'undefined') return;
  if (!theme?.colors) return;
  const { colors: c } = theme;

  const css = `
:root:not(.dark) {
  --background: ${c.background};
  --foreground: ${c.foreground};
  --primary: ${c.primary};
  --primary-foreground: ${c.primaryForeground};
  --secondary: ${c.secondary};
  --secondary-foreground: ${c.secondaryForeground};
  --muted: ${c.muted};
  --muted-foreground: ${c.mutedForeground};
  --accent: ${c.accent};
  --accent-foreground: ${c.accentForeground};
  --success: ${c.success};
  --success-foreground: ${c.successForeground};
  --warning: ${c.warning};
  --warning-foreground: ${c.warningForeground};
  --danger: ${c.danger};
  --danger-foreground: ${c.dangerForeground};
  --destructive: ${c.danger};
  --destructive-foreground: ${c.dangerForeground};
  --border: ${c.border};
  --input: ${c.input};
  --ring: ${c.ring};
  --popover: ${c.popover};
  --popover-foreground: ${c.popoverForeground};
}`.trim();

  let styleEl = document.getElementById(THEME_STYLE_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = THEME_STYLE_ID;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = css;
}

// ─── CSS Variable Generator ───────────────────────────────────────────────────

/**
 * Converts a Theme's colors into a CSS `:root { }` block string.
 * Used by scripts to generate or sync CSS.
 */
export function toCssVars(theme: Theme): string {
  const { colors: c } = theme;
  const vars: [string, string][] = [
    ['--background', c.background],
    ['--foreground', c.foreground],
    ['--primary', c.primary],
    ['--primary-foreground', c.primaryForeground],
    ['--secondary', c.secondary],
    ['--secondary-foreground', c.secondaryForeground],
    ['--muted', c.muted],
    ['--muted-foreground', c.mutedForeground],
    ['--accent', c.accent],
    ['--accent-foreground', c.accentForeground],
    ['--success', c.success],
    ['--success-foreground', c.successForeground],
    ['--warning', c.warning],
    ['--warning-foreground', c.warningForeground],
    ['--danger', c.danger],
    ['--danger-foreground', c.dangerForeground],
    ['--destructive', c.danger],
    ['--destructive-foreground', c.dangerForeground],
    ['--border', c.border],
    ['--input', c.input],
    ['--ring', c.ring],
    ['--popover', c.popover],
    ['--popover-foreground', c.popoverForeground],
  ];
  const body = vars.map(([k, v]) => `        ${k}: ${v};`).join('\n');
  return `:root {\n${body}\n    }`;
}

// ─── Custom Theme Factory ─────────────────────────────────────────────────────

/**
 * Creates a custom theme by merging overrides with the default (indigo) theme.
 *
 * @example
 * const myTheme = createTheme('brand', 'My Brand', { primary: '#ff6b35' });
 */
export function createTheme(
  name: string,
  label: string,
  colors: Partial<ThemeColors>
): Theme {
  const base = themes[0]; // indigo as default base
  return {
    name,
    label,
    colors: { ...base.colors, ...colors },
  };
}

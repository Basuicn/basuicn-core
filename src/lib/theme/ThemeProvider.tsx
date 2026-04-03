'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { themes, applyTheme, createTheme, type Theme, type ThemeColors, type BuiltInThemeName } from './themes';

const STORAGE_KEY = 'ui-theme';

/**
 * Union type for autocomplete suggestions while allowing any string.
 */
export type ThemeName = BuiltInThemeName | (string & {});

interface ThemeContextValue {
  currentTheme: Theme;
  setTheme: (name: ThemeName) => void;
  /** Register and switch to a custom theme */
  setCustomTheme: (name: string, label: string, colors: Partial<ThemeColors>) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextValue>({
  currentTheme: themes[0],
  setTheme: () => {},
  setCustomTheme: () => {},
  themes,
});

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeName;
}

const getStoredTheme = (allThemes: Theme[], defaultThemeName?: ThemeName): Theme => {
  if (typeof window === 'undefined') return allThemes[0];
  // defaultTheme prop in code takes priority over localStorage
  if (defaultThemeName) {
    return allThemes.find(t => t.name === defaultThemeName) ?? allThemes[0];
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return allThemes.find(t => t.name === saved) ?? allThemes[0];
    }
    return allThemes[0];
  } catch {
    return allThemes[0];
  }
};

export function ThemeProvider({ children, defaultTheme }: ThemeProviderProps) {
  const [allThemes, setAllThemes] = useState<Theme[]>(themes);
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => getStoredTheme(themes, defaultTheme));

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const setTheme = (name: ThemeName) => {
    const found = allThemes.find(t => t.name === name);
    if (!found) return;
    try { localStorage.setItem(STORAGE_KEY, name); } catch { /* SSR / quota */ }
    setCurrentTheme(found);
  };

  const setCustomTheme = (name: string, label: string, colors: Partial<ThemeColors>) => {
    const custom = createTheme(name, label, colors);
    setAllThemes(prev => {
      const exists = prev.findIndex(t => t.name === name);
      return exists >= 0
        ? prev.map(t => t.name === name ? custom : t)
        : [...prev, custom];
    });
    try { localStorage.setItem(STORAGE_KEY, name); } catch { /* SSR / quota */ }
    setCurrentTheme(custom);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, setCustomTheme, themes: allThemes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

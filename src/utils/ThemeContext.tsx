import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available themes
export type Theme = 'light' | 'dark' | 'high-contrast';

// Define theme context interface
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Create theme context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

// Props for ThemeProvider
interface ThemeProviderProps {
  defaultTheme?: Theme;
  children: ReactNode;
}

/**
 * ThemeProvider component that manages theme state and applies theme class to the document
 * @param {Theme} defaultTheme - Optional default theme setting (defaults to 'light')
 * @param {ReactNode} children - Child components
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  defaultTheme = 'light', 
  children 
}) => {
  // Initialize from local storage if available, otherwise use default
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('ecl-theme') as Theme;
      return savedTheme || defaultTheme;
    }
    return defaultTheme;
  });

  // Apply theme class to document and save to localStorage when theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Remove existing theme classes
      document.documentElement.classList.remove('ecl-theme-light', 'ecl-theme-dark', 'ecl-theme-high-contrast');
      
      // Add new theme class
      if (theme !== 'light') {
        document.documentElement.classList.add(`ecl-theme-${theme}`);
      }
      
      // Save to localStorage
      localStorage.setItem('ecl-theme', theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook for using the theme context
 * @returns {ThemeContextType} Theme context with current theme and setTheme function
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

# ECL Theming System

## Overview

The Enterprise Component Library (ECL) uses a robust theming system built with CSS variables (custom properties) and Tailwind CSS. This approach allows for consistent styling across components while enabling easy theme customization.

## Theme Structure

The theming system is organized around these key concepts:

1. **Design Tokens**: Primitive values (colors, spacing, typography, etc.) defined as CSS variables
2. **Component Tokens**: Component-specific variables that reference design tokens
3. **Theme Variants**: Predefined themes (light, dark, high-contrast)

## Design Tokens

Design tokens are the foundation of our theming system. They are implemented as CSS variables and organized into these categories:

### Colors

```css
/* Base colors */
--color-primary-50: #f0f9ff;
--color-primary-100: #e0f2fe;
/* ... more color variables ... */

/* Semantic colors */
--color-background: var(--color-neutral-50);
--color-foreground: var(--color-neutral-900);
--color-accent: var(--color-primary-500);
/* ... more semantic color variables ... */
```

### Typography

```css
/* Font families */
--font-family-sans: 'Inter', system-ui, sans-serif;
--font-family-mono: 'Roboto Mono', monospace;

/* Font sizes */
--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
/* ... more font size variables ... */

/* Font weights */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-bold: 700;

/* Line heights */
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-loose: 1.75;
```

### Spacing

```css
--spacing-0: 0;
--spacing-px: 1px;
--spacing-0-5: 0.125rem;
--spacing-1: 0.25rem;
/* ... more spacing variables ... */
```

### Borders

```css
--border-width-none: 0;
--border-width-thin: 1px;
--border-width-thick: 2px;

--border-radius-none: 0;
--border-radius-sm: 0.125rem;
--border-radius-md: 0.25rem;
/* ... more border variables ... */
```

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
/* ... more shadow variables ... */
```

## Component Tokens

Component tokens are CSS variables specific to individual components. They reference design tokens to ensure consistency while allowing component-specific customization.

Example for Button component:

```css
/* Button tokens */
--button-font-weight: var(--font-weight-medium);
--button-border-radius: var(--border-radius-md);
--button-focus-ring-color: var(--color-primary-300);

/* Button variants */
--button-primary-bg: var(--color-primary-500);
--button-primary-text: var(--color-white);
--button-primary-border: var(--color-primary-500);
--button-primary-hover-bg: var(--color-primary-600);
/* ... more button variables ... */
```

## Theme Variants

ECL includes three predefined themes:

1. **Light Theme (Default)**: Optimized for standard use with light backgrounds
2. **Dark Theme**: Inverted color scheme for dark mode preferences
3. **High Contrast Theme**: Enhanced contrast for accessibility needs

### Theme Implementation

Themes are implemented using CSS classes on the `<html>` element:

```css
/* Light theme (default) */
:root {
  --color-background: var(--color-neutral-50);
  --color-foreground: var(--color-neutral-900);
  /* ... more variables ... */
}

/* Dark theme */
.dark-theme {
  --color-background: var(--color-neutral-900);
  --color-foreground: var(--color-neutral-50);
  /* ... more variables ... */
}

/* High contrast theme */
.high-contrast-theme {
  --color-background: var(--color-black);
  --color-foreground: var(--color-white);
  /* ... more variables ... */
}
```

## Using the Theme Context

ECL provides a React context for theme management:

```tsx
import { useTheme, ThemeProvider } from 'ecl';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <MyComponents />
    </ThemeProvider>
  );
}

function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('dark')}>
        Switch to Dark Mode
      </button>
    </div>
  );
}
```

## Customizing Themes

### Method 1: CSS Variables Override

Create a CSS file that overrides the default variables:

```css
:root {
  --color-primary-500: #0070f3;
  --button-primary-bg: var(--color-primary-500);
}
```

### Method 2: Theme Provider Configuration

Pass custom theme values to the ThemeProvider:

```tsx
const customTheme = {
  colors: {
    primary: {
      500: '#0070f3',
    },
  },
};

function App() {
  return (
    <ThemeProvider defaultTheme="light" customTheme={customTheme}>
      <MyComponents />
    </ThemeProvider>
  );
}
```

## Best Practices

1. **Always use design tokens**: Avoid hardcoded values in component styles
2. **Follow the token hierarchy**: Design tokens → Component tokens → Component styles
3. **Test all themes**: Ensure components look good in all theme variants
4. **Consider color contrast**: Maintain WCAG AA compliance (4.5:1 for normal text)
5. **Use semantic tokens**: Prefer `--color-background` over `--color-neutral-50`

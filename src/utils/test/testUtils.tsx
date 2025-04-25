import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '../ThemeContext';
import userEvent from '@testing-library/user-event';

// Custom render function that includes providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { theme?: 'light' | 'dark' | 'high-contrast' }
) => {
  const { theme = 'light', ...renderOptions } = options || {};
  
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <ThemeProvider defaultTheme={theme}>
        {children}
      </ThemeProvider>
    );
  };
  
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Setup user-event
const setupUserEvent = () => userEvent.setup();

export * from '@testing-library/react';
export { customRender as render, setupUserEvent };

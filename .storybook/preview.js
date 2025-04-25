import React from 'react';
// Import Tailwind CSS directly
import '!style-loader!css-loader!postcss-loader!../src/styles/index.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#f9fafb',
        },
        {
          name: 'dark',
          value: '#1f2937',
        },
      ],
    },
    layout: 'centered',
  },
  decorators: [
    (Story, context) => {
      // Theme decorator - adds the selected theme class to the story container
      const theme = context.globals.theme || 'light';
      const themeClass = theme === 'dark' ? 'ecl-theme-dark' : 
                          theme === 'high-contrast' ? 'ecl-theme-high-contrast' : '';
      
      return (
        <div className={themeClass} style={{ margin: '2em', minHeight: '100px' }}>
          <Story />
        </div>
      );
    },
  ],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
          { value: 'high-contrast', icon: 'contrast', title: 'High Contrast' },
        ],
        showName: true,
      },
    },
  },
};

export default preview;

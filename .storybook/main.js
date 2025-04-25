/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "./addons/testStates.js",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  babel: async (options) => {
    return { ...options, configFile: './.storybook/babel.config.js' };
  },
  webpackFinal: async (config) => {
    // Find the CSS rule
    const cssRule = config.module.rules.find(
      (rule) => rule.test && rule.test.toString().includes('css')
    );

    // Add postcss-loader to the CSS rule
    if (cssRule && cssRule.use) {
      // Make sure cssRule.use is an array
      const cssUse = Array.isArray(cssRule.use) ? cssRule.use : [cssRule.use];
      
      cssUse.push({
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              require('tailwindcss'),
              require('autoprefixer'),
            ],
          },
        },
      });
      
      cssRule.use = cssUse;
    }
    
    return config;
  },
};
export default config;

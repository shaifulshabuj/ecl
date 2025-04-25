module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
    ['@babel/preset-typescript', { allowNamespaces: true, isTSX: true, allExtensions: true }]
  ],
  plugins: []
};

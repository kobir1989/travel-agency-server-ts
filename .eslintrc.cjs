module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    indent: ['error', 2], // Enforce 3 spaces for indentation
    quotes: ['error', 'single'], // Enforce single quotes for strings
    semi: ['error', 'always'], // Require semicolons at the end of statements
  },
};
//lint commands
//npm run lint
//npm run lint:fix
//npm run format

const stagedConfig = {
  '*.{js,jsx}': ['npm run oxlint', 'prettier --cache --write'],
  '*.{ts,tsx}': [
    "sh -c 'tsc -p tsconfig.app.json'",
    'npm run oxlint',
    'prettier --cache --parser=typescript --write',
  ],
  '*.{css,less}': ['npm run stylelint', 'prettier --cache --write'],
  '*.{md,json}': ['prettier --cache --write'],
};

export default stagedConfig;

const stylelintConfig = {
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      customSyntax: 'postcss-styled-syntax',
    },
  ],
  extends: ['stylelint-config-standard'],
  rules: {},
};

export default stylelintConfig;

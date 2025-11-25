const stylelintConfig = {
  overrides: [
    {
      files: ['**/*.{ts,tsx,js,jsx}'],
      customSyntax: 'postcss-styled-syntax',
    },
  ],
  extends: ['stylelint-config-standard'],
  rules: {},
};

export default stylelintConfig;

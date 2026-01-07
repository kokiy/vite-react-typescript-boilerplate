/** @type {import('stylelint').Config} */

const stylelintConfig = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  ignoreFiles: ['**/node_modules/**', '**/dist/**', 'public'],
  rules: {
    'at-rule-no-unknown': undefined,
    'color-no-invalid-hex': true,
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global'] },
    ],
  },
};

export default stylelintConfig;

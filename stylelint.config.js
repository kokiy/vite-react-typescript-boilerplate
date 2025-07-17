/** @type {import('stylelint').Config} */

export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  ignoreFiles: ['**/node_modules/**', '**/dist/**', 'public'],
  rules: {
    'at-rule-no-unknown': null,
    'color-no-invalid-hex': true,
  },
};

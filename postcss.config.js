const postcssConfig = {
  extract: true,
  minimize: true,
  modules: false,
  inject: true,
  plugins: {
    autoprefixer: {},
    'postcss-nested': {},
    'postcss-pxtorem': {
      rootValue: 16,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      minPixelValue: 0,
    },
  },
};

export default postcssConfig;

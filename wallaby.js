module.exports = function (wallaby) {
  const path = require('path');
  return {
    files: ['src/**/*', 'package.json', 'tsconfig.json', 'babel.config.js'],
    tests: ['tests/**/*.spec.ts'],
    env: {
      type: 'node',
      runner: 'node',
    },
    preprocessors: {
      '**/*.js': file =>
        require('babel-core').transform(file.content, {
          sourceMaps: true,
          compact: false,
          filename: file.path,
          presets: ['env'],
        }),
      '**/*.vue': file => require('vue-jest').process(
        file.content, file.path,
        {globals: {'vue-jest': {babelRcFile: path.join(wallaby.projectCacheDir, 'babel.config.js')}}}),

      'babel.config.js': file => 'false'
    },
    setup: () => {
      require('browser-env')();
      const Vue = require('vue');
      Vue.config.productionTip = false;
    },
    testFramework: 'ava',
    debug: true,
  };
};

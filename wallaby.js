module.exports = function () {
  return {
    files: ['src/**/*', 'package.json', 'tsconfig.json'],
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
        })
    },
    setup: () => {
      require('browser-env')();
      const hooks = require('require-extension-hooks');
      const Vue = require('vue');
      Vue.config.productionTip = false;
      hooks('vue')
        .plugin('vue')
        .push();
      hooks(['vue', 'ts'])
        .plugin('babel')
        .push();
    },
    testFramework: 'ava',
    debug: true,
  };
};

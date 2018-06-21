module.exports = function(wallaby) {
  process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;

  const compiler = wallaby.compilers.babel({
    presets: [['@vue/app', { modules: 'commonjs' }]],
  });

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
        }),
      '**/*.vue': file => require('vue-jest').process(file.content, file.path),
    },
    compilers: {
      '**/*.js': compiler,
      '**/*.ts': wallaby.compilers.typeScript(require('./tsconfig.json')),
      '**/*.vue': require('wallaby-vue-compiler')(compiler),
    },
    testFramework: 'ava',
    debug: true,
  };
};

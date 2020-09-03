
const testCode = 'src/**/*test.ts';
const webpackConfig = require('./webpack.config.js');
const jasmineConfig = require('./jasmine.json');


module.exports = function (config) {
  config.set({
    autoWatch: false,
    basePath: '',
    browsers: ['Chrome'],
    colors: true,
    concurrency: Infinity,
    coverageIstanbulReporter: {
            fixWebpackSourcePaths: true,
            reports: ['html']
          },
    exclude: [],
    files: [
      {pattern: testCode, watched: false}
    ],
    frameworks: ['jasmine'],
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {[testCode]: ['webpack']},
    reporters: ['progress', 'coverage-istanbul'],
    singleRun: true,
    webpack: webpackConfig
  });
};
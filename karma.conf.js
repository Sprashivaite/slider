const testCode = 'src/**/*test.js';
const webpackConfig = require('./config/webpack.common'); 

module.exports = function karma(config) {
  config.set({
    autoWatch: true,
    basePath: '',
    browsers: ['Chrome'],
    colors: true,
    concurrency: Infinity,
    coverageIstanbulReporter: {
      fixWebpackSourcePaths: true,
      reports: ['html'],
    },
    exclude: [],
    files: [{ pattern: testCode, watched: true }, 'src/style.css'],
    frameworks: ['jasmine'],
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: { [testCode]: ['webpack'] },
    reporters: ['progress', 'coverage-istanbul'],
    singleRun: false,
    webpack: webpackConfig,
  });
};

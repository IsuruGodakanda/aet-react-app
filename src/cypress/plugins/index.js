import pluginPreprocessor from 'cypress-react-unit-test/plugins/react-scripts';

module.exports = (on, config) => {
  pluginPreprocessor(on, config);
  return config;
};

// module.exports = (on, config) => {
//   on('before:browser:launch', (browser = {}, launchOptions) => {
//     if (browser.family === 'chromium' && browser.name !== 'electron') {
//       // pass launchOptions to Chromium-based browsers in 4.0
//       return launchOptions;
//     }
//   });
// };

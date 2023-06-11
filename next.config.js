const withOffline = require('next-offline');

module.exports = withOffline({
  // next-offline options go here
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
});
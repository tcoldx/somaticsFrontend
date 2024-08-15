const { getDefaultConfig } = require("@expo/metro-config");

const {
  getSentryExpoConfig
} = require("@sentry/react-native/metro");

module.exports = (async () => {
  const defaultConfig = await getSentryExpoConfig(__dirname);
  // Customize the config if needed
  return defaultConfig;
})();
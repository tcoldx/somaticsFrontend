const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Disable minification for web builds
config.transformer = {
  ...config.transformer,
  minifierConfig: {
    compress: false,
    mangle: false,
  },
};

// Add support for resolving modules
config.resolver = {
  ...config.resolver,
  nodeModulesPaths: [
    path.resolve(__dirname, 'node_modules'),
    path.resolve(__dirname),
  ],
  // Fix for react-native-svg module resolution
  sourceExts: [...(config.resolver.sourceExts || []), 'svg'],
  resolverMainFields: ['react-native', 'browser', 'main'],
};

// Configure Metro for proxy deployment
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // Check if we're being accessed through the proxy
      const proxyPath = req.headers['x-forwarded-prefix'];
      if (proxyPath) {
        // Inject base path into the HTML
        const originalSend = res.send;
        res.send = function(data) {
          if (typeof data === 'string' && data.includes('<head>')) {
            // Add base tag to make all relative URLs work
            data = data.replace(
              '<head>',
              `<head><base href="${proxyPath}/">`
            );
          }
          originalSend.call(this, data);
        };
      }
      return middleware(req, res, next);
    };
  },
};

module.exports = config;
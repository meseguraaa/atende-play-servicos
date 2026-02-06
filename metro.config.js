const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Evita que o bundler do app iOS/Android puxe código server-only do Next (app/api)
config.resolver.blockList = [/.*\/src\/app\/api\/.*/];

module.exports = config;

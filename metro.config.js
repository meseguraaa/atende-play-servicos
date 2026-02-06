const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Evita que o bundler do app iOS/Android puxe código server-only do Next (routes)
// - src/app/api/** (Next Route Handlers)
// - src/app/media/** (Route Handler que usa fs/promises)
config.resolver.blockList = [
    /.*\/src\/app\/api\/.*/,
    /.*\/src\/app\/media\/.*/,
];

module.exports = config;

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Evita que o bundler do app iOS/Android puxe código server-only do Next (routes)
config.resolver.blockList = [
    /.*\/src\/app\/api\/.*/,
    /.*\/src\/app\/media\/.*/,
    /.*\/src\/app\/painel\/.*/,
];

module.exports = config;

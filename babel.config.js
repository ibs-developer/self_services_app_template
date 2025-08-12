module.exports = function (api) {
  api.cache(false);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      // ✅ this must be listed separately and LAST
      'react-native-reanimated/plugin',
      [
        'module:react-native-dotenv',
        {
          moduleName: "@env",
          path: "./.env",
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      [
        'module-resolver',
        {
          root: ["./"],
          alias: {
            "@": "./src",
          },
        },
      ],
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel', 'react-native-reanimated/plugin'],
      },
    },
  };
};

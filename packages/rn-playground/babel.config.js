module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            'react-native-linear-gradient': 'expo-linear-gradient',
          },
        },
      ],
      'react-native-reanimated/plugin',
      ['@babel/plugin-transform-private-methods', { loose: true }],
    ],
  };
};

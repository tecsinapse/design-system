const path = require('path');

module.exports = async ({ config }) => {
  config.resolve.alias = {
    'react-native$': 'react-native-web',
    'react-native-vector-icons': 'react-native-vector-icons/dist',
  };

  config.module.rules.push({
    test: /\.ttf$/,
    loader: 'url-loader', // or directly file-loader
    include: path.resolve(
      __dirname,
      '..',
      'node_modules/react-native-vector-icons'
    ),
  });

  return config;
};

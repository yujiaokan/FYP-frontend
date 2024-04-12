module.exports = {
  presets: [
    ['@babel/preset-env',{loose: true }],
    'module:metro-react-native-babel-preset',
    '@babel/preset-react',
    '@babel/preset-typescript', // if using TypeScript
  ],
  plugins: [
    // ['@babel/plugin-transform-class-properties', { loose: true }],
    // ['@babel/plugin-transform-private-methods', { loose: true }],
    // ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    ["@babel/plugin-transform-flow-strip-types"],
     [ "@babel/plugin-proposal-class-properties"],
    [
      
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@components': './src/components',
          '@screens': './src/screens',
          // ... more aliases
        },
      },
    ],
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        "envName": "APP_ENV",
        // ... other react-native-dotenv options
      },
    ],
  ],
};

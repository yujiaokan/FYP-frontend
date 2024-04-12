
module.exports = {

  preset: 'react-native',
  
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node','android.js', 'ios.js'],
  moduleDirectories: ["node_modules", "src"],
  
  transform: {
  //'^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
   '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
   // "\\.css$": "some-css-transformer",
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      "<rootDir>/fileTransformer.js",

  },
  //testEnvironment: 'node',
 
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-vector-icons|react-native-gesture-handler)/)'
  ],
 // testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  // setupFilesAfterEnv is an array of file paths. Point it to your custom setup file, which may look like './jest.setup.js'
 // setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  
};


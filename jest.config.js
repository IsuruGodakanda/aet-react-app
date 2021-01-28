module.exports = {
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '.*.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    'Actions(.*)$': '<rootDir>/src/redux/actions/$1',
    'Animations(.*)$': '<rootDir>/src/assets/animations/$1',
    'Components(.*)$': '<rootDir>/src/components/$1',
    'Images(.*)$': '<rootDir>/src/assets/images/$1',
    'Pages(.*)$': '<rootDir>/src/pages/$1',
    'Redux(.*)$': '<rootDir>/src/redux/$1',
    'Services(.*)$': '<rootDir>/src/services/$1',
  },
};

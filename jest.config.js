module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/src/setupEnzyme.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
    'Actions/(.*)$': '<rootDir>/src/redux/actions/$1',
    'Animations/(.*)$': '<rootDir>/src/assets/animations/$1',
    'Components/(.*)$': '<rootDir>/src/components/$1',
    'Images/(.*)$': '<rootDir>/src/assets/images/$1',
    'Pages/(.*)$': '<rootDir>/src/pages/$1',
    'Redux/(.*)$': '<rootDir>/src/redux/$1',
    'Services/(.*)$': '<rootDir>/src/services/$1',
  },
};

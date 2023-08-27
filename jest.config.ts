import jest from 'jest';

const config: jest.Config = {
  roots: ['<rootDir>/tests'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  setupFiles: [
    'dotenv/config',
  ],
  cache: false,
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};

export default config;
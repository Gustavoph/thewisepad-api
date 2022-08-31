/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: [
    '<rootDir>/src',
    '<rootDir>/test'
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/**/ports/*.ts',
    '!<rootDir>/src/**/server.ts'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/test/$1'
  }
}

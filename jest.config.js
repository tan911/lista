/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '@app/(.*)': '<rootDir>/src/$1',
        '@lib': '<rootDir>/lib/$1',
        '@db': '<rootDir>/db/$1',
        '@controllers': '<rootDir>/src/controllers/$1',
        '@config': '<rootDir>/src/config/$1',
        '@utils': '<rootDir>/src/utils/$1',
        '@middlewares': '<rootDir>/src/middlewares/$1',
        '@routes': '<rootDir>/src/routes/$1',
        '@services': '<rootDir>/src/services/$1',
    },
}

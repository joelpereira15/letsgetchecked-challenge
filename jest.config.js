module.exports = {
    preset: 'jest-preset-angular',
    testResultsProcessor: 'jest-sonar-reporter',
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    globals: {
        'ts-jest': {
            tsConfig: '<rootDir>/tsconfig.spec.json',
            diagnostics: false,
        },
    },
    testRegex: 'src[\\/].*\\.spec\\.ts$',
    testMatch: null,
    moduleNameMapper: {
        '@app/(.*)': '<rootDir>/src/app/$1',
    },
    collectCoverage: true,
    coverageThreshold: {
        global: {
            statements: 80,
            branches: 80,
            functions: 80,
            lines: 80,
        },
    },
    coverageReporters: ['json', 'lcov'],
};

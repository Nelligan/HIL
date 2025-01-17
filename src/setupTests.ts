import '@testing-library/jest-dom'

Object.defineProperty(global, 'importMeta', {
    value: {
        env: {
            VITE_GIPHYKEY: 'mocked-api-key',
        },
    },
});
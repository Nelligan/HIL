import { errorMessages } from "../error.messages";

describe('errorMessages', () => {

    it('should handle API errors', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        const error = {
            response: {
                status: 404,
                statusText: 'Not Found',
                data: {},
                config: { url: '/test' },
            },
        };
        expect(errorMessages(error)).toBe('API Error: 404 Not Found');
        consoleErrorSpy.mockRestore();

    });

    it('should handle Network errors', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        const error = {
            request: {},
            message: 'Network Error',
        };
        expect(errorMessages(error)).toBe('Network Error: Unable to fetch data.');
        consoleErrorSpy.mockRestore();
    });

    it('should handle unexpected errors', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        const error = {
            message: 'Unexpected Error',
        };
        expect(errorMessages(error)).toBe('Unexpected Error occurred.');
        consoleErrorSpy.mockRestore();
    });
});

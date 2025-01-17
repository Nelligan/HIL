import MockAdapter from 'axios-mock-adapter'
import axiosInstance from '../axios.instance'

describe('Axios Instance', () => {
    let mock: InstanceType<typeof MockAdapter>

    beforeEach(() => {
        mock = new MockAdapter(axiosInstance)
    })

    afterEach(() => {
        mock.reset()
    })

    it('should have the correct base URL and headers', () => {
        const config = axiosInstance.defaults;
        expect(config.baseURL).toBe('https://api.giphy.com/v1/gifs');
        expect(config.headers['Content-type']).toBe('application/json');
        /**
         * once I can figure out how to test the import.meta the API is hardcoded
         */
        expect(config.params.api_key).toBe('xtjHGY36XFLzLogfPdUnavy1a12nyeMI');
    });

    it('should log request details via request interceptor', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        mock.onGet('/search').reply(200, { data: [] })

        await axiosInstance.get('/search')

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Request:'),
            expect.objectContaining({
                url: '/search'
            })
        )

        consoleSpy.mockRestore()
    })
    it('should log response details via response interceptor', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        mock.onGet('/search').reply(200, { data: ['mocked response'] });

        const response = await axiosInstance.get('/search');
        expect(response.data).toEqual({ data: ['mocked response'] });
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Response:'),
            { data: ['mocked response'] }
        );

        consoleSpy.mockRestore();
    });
    it('should handle request errors in request interceptor', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        mock.onGet('/error').reply(400);

        await axiosInstance.get('/error').catch(() => { }); // Suppress error in test

        // Update the expectation to match "Response Error:"
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Response Error:',
            expect.stringContaining('Request failed with status code 400')
        );

        consoleErrorSpy.mockRestore();
    });



})
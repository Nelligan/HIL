import { getTrendingGifs } from '../giphyService';
import axiosInstance from '../../axiosInstance/axios.instance';
import { HILGifData } from '../../sharedTypes';
import { errorMessages } from '../../Error/error.messages';

// Mocking axiosInstance
jest.mock('../../axiosInstance/axios.instance');

describe('getTrendingGifs', () => {
    it('should return trending gifs on successful API call', async () => {
        // Mock data to be returned by axiosInstance
        const mockData: HILGifData[] = [
            {
                id: '1',
                images: {
                    fixed_height_downsampled: { url: 'https://example.com/gif1.gif' }
                }, title: 'Gif 1'
            },
            {
                id: '2',
                images: {
                    fixed_height_downsampled: { url: 'https://example.com/gif2.gif' }
                }, title: 'Gif 2'
            }
        ];

        // Mocking the axiosInstance.get method to return a successful response
        (axiosInstance.get as jest.Mock).mockResolvedValue({
            data: {
                data: mockData
            }
        });

        // Calling the function
        const result = await getTrendingGifs();

        // Assertions
        expect(result).toEqual(mockData);
        expect(axiosInstance.get).toHaveBeenCalledWith('/trending', {
            params: { limit: 25, offset: 0 }
        });
    });
    it('should handle API errors correctly', () => {
    // Mock console.error
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        // Mocking an API error response
        const error = {
            response: {
                status: 404,
                statusText: 'Not Found',
                data: { message: 'Resource not found' },
                config: { url: '/test' },
            },
        };

        // Call the errorMessages function
        const result = errorMessages(error);

        // Assert the console error was logged with the updated structure
        expect(consoleErrorSpy).toHaveBeenCalledWith('API Error:', {
            status: 404,
            statusText: 'Not Found',
            url: '/test',
            data: error.response.data,
        });

        // Assert the returned error message
        expect(result).toBe('API Error: 404 Not Found');

        // Clean up the spy
        consoleErrorSpy.mockRestore();
    });
    it('should handle network errors correctly', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        const error = {
            request: {},
            message: 'Network Error',
        };
        expect(errorMessages(error)).toBe('Network Error: Unable to fetch data.');
        consoleErrorSpy.mockRestore();
    })
    it('should handle other errors correctly', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        const error = {
            message: 'Unexpected Error',
        };
        expect(errorMessages(error)).toBe('Unexpected Error occurred.');
        consoleErrorSpy.mockRestore();
    })
});

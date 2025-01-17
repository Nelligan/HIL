import { getTrendingGifs } from '../giphyService';
import axiosInstance from '../../axiosInstance/axios.instance';
import { HILGifData } from '../../sharedTypes';

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
    it('should throw an error if API call fails', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        // Mocking the axiosInstance.get method to throw an error
        (axiosInstance.get as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

        // Calling the function and asserting that it throws an error
        await expect(getTrendingGifs()).rejects.toThrow('Failed to get the gifs');
        expect(axiosInstance.get).toHaveBeenCalledWith('/trending', {
            params: { limit: 25, offset: 0 }
        });

        // Ensure console.error was called with the expected error message
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching Gifs', expect.anything());

        // Clean up the spy
        consoleErrorSpy.mockRestore();
    });
});

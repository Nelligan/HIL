import { searchGiphyService } from '../searchGiphyService';  // Adjust path accordingly
import axiosInstance from '../../axiosInstance/axios.instance';
import { HILGifData } from '../../sharedTypes';

// Mocking axiosInstance
jest.mock('../../axiosInstance/axios.instance');

describe('searchGiphyService', () => {
    it('should return an empty array if the query is empty or whitespace', async () => {
        const result = await searchGiphyService('');
        expect(result).toEqual([]);

        const resultWhitespace = await searchGiphyService('   ');
        expect(resultWhitespace).toEqual([]);
    });

    it('should return data if the API call is successful', async () => {
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
        ];;

        // Mocking the axiosInstance.get method to return a successful response
        (axiosInstance.get as jest.Mock).mockResolvedValueOnce({
            data: {
                data: mockData
            }
        });

        const query = 'Lorry';
        const result = await searchGiphyService(query);

        // Assertions
        expect(result).toEqual(mockData);
        expect(axiosInstance.get).toHaveBeenCalledWith('/search', {
            params: { q: query }
        });
    });

    it('should throw an error if the API call fails', async () => {
        // Spy on console.error to suppress the error log
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        // Mocking the axiosInstance.get method to reject with an error
        (axiosInstance.get as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

        // Awaiting and asserting that it throws the correct error
        await expect(searchGiphyService('Lorry')).rejects.toThrow('Failed to fetch Gifs');

        // Ensure axiosInstance.get was called with the correct parameters
        expect(axiosInstance.get).toHaveBeenCalledWith('/search', {
            params: { q: 'Lorry' }
        });

        // Ensure console.error was called with the expected error message
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching Gifs', expect.anything());

        // Clean up the spy
        consoleErrorSpy.mockRestore();
    });
});

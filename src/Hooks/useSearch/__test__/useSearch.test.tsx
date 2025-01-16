import { renderHook, act } from "@testing-library/react";
import useSearch from "../useSearch";
import { getTrendingGifs } from "../../../services/giphyService/giphyService";
import { searchGiphyService } from "../../../services/searchGiphyService/searchGiphyService";


jest.mock('../../../services/giphyService/giphyService', () => ({
    getTrendingGifs: jest.fn()
}))
jest.mock('../../../services/searchGiphyService/searchGiphyService', () => ({
    searchGiphyService: jest.fn()
}))
const mockedTrendingGifs =  getTrendingGifs as jest.Mock
const mockedSearchGifs = searchGiphyService as jest.Mock
describe('useSearch Hook', () => {
    it('should init with Trending Gifs', () => {
        const { result } = renderHook(() => useSearch())
    expect(result.current.query).toBe('')
    expect(result.current.isSearching).toBe(false)
    })
    it('should update the query state useing setQuery ', () => {
        const { result } = renderHook(() => useSearch())
        act(() => {
            result.current.setQuery('Lorry')
        })
        expect(result.current.query).toBe('Lorry')
    })
    it('should uypdate the is searching state using setIsSearching', () => {
        const { result } = renderHook(() => useSearch())
        act(() => {
            result.current.setIsSearching(true)
        })
        expect(result.current.isSearching).toBe(true)
        
    })
    it('Should call the trending gifs fn when isSearching is false', async () => {
        const { result } = renderHook(() => useSearch())
    
          
            mockedTrendingGifs.mockReturnValue(['gif1', 'gif2'])
    
            const featchResults = await result.current.fetchCallback()
            expect(getTrendingGifs).toHaveBeenCalledWith(20,0)
            expect(featchResults).toEqual(['gif1','gif2'])
        
    })

})
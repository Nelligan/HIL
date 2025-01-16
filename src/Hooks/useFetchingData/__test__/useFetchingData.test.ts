import { renderHook } from "@testing-library/react";
import { useQuery } from 'react-query'
import useFetchingData from "../useFetchingData";

jest.mock('react-query')

const mockedUseQuery = useQuery as jest.Mock

describe('useFetchingData Hook', () => {
    it('Should return data when query is successful' , () => {
        // mock useQuery's return value for success 

        mockedUseQuery.mockReturnValue({
            data: [{id: 1, title: "some gif"}],
            isLoading: false,
            isError: false
        })

        const {result} = renderHook(() => {
            return useFetchingData({
                uniqueKey: "testing",
                stale: 30000,
                cache: 60000,
                cb: jest.fn()
            })
        })

        expect(result.current.data).toEqual([{id: 1, title: "some gif"}])
        expect(result.current.isLoading).toBe(false)
        expect(result.current.isError).toBe(false)

    })
    it('returns loading state when the query is loading', ()=> {
        mockedUseQuery.mockReturnValue({
            data: undefined,
            isLoading: true,
            isError: false
        })

        const {result} = renderHook(() => {
            return useFetchingData({
                uniqueKey: "testing",
                stale: 30000,
                cache: 60000,
                cb: jest.fn()
            })
        })
        expect(result.current.data).toBeUndefined()
        expect(result.current.isLoading).toBe(true)
        expect(result.current.isError).toBe(false)

    })
    it('returns error state when the query is failed', ()=> {
        mockedUseQuery.mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: true
        })

        const {result} = renderHook(() => {
            return useFetchingData({
                uniqueKey: "testing",
                stale: 30000,
                cache: 60000,
                cb: jest.fn()
            })
        })
        expect(result.current.data).toBeUndefined()
        expect(result.current.isLoading).toBe(false)
        expect(result.current.isError).toBe(true)
    })
})


import React from 'react'
import {render, screen } from '@testing-library/react'
import TrendingGifs from '../TrendingGifs'
import GifCard from '../GifCard/GifCard'

jest.mock('../GifCard/GifCard', () => ({
    __esModule: true,
    default: jest.fn(({gif}) => <div data-testid="gif-card">{gif.title}</div>)
}))

describe('Trending Gifs Componet', () => {
    const gifsMock = [
        {
            id: "1",
            title:"Test Gif 1",
            images:{
                fixed_height_downsampled: { url: 'https://example.com/gif1.gif' }
            }
        },
        {
            id: "2",
            title:"Test Gif 2",
            images:{
                fixed_height_downsampled: { url: 'https://example.com/gif2.gif' }
            }
        }
    ]

    it('renders loading state', () => {
        render(<TrendingGifs gifs={gifsMock} isLoading={true} isError={false} />)
        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
    it('renders the error state', () => {
        render(<TrendingGifs gifs={gifsMock} isLoading={false} isError={true}/>)
        expect(screen.getByText('Error trying to fetch gifs')).toBeInTheDocument()
    })
    it('renders no gifs message if there are none', () => {
        render(<TrendingGifs gifs={[]} isLoading={false} isError={false} />)
        expect(screen.getByText('No gifs found')).toBeInTheDocument()
    })
    it('renders the gi catd Correctly', () => {
        render(<TrendingGifs gifs={gifsMock} isLoading={false} isError={false}/>)
        expect(GifCard).toHaveBeenCalledTimes(2)

        gifsMock.forEach((gif) => {
            expect(screen.getByText(gif.title)).toBeInTheDocument()
        })
    })

    it('does not render loading or error state when the gifs are present', () => {
        render(<TrendingGifs gifs={gifsMock} isLoading={false} isError={false}/>)
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
        expect(screen.queryByText('Error trying to fetch gifs')).not.toBeInTheDocument()
    })
})
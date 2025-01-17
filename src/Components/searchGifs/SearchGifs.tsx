import React from 'react'
import './style/style.css'
type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
interface HILSearchGifs {
    query: string
    setQuery: SetState<string>
    handleSearch: () => void
}
const SearchGifs: React.FC<HILSearchGifs> = React.memo(({query,setQuery,handleSearch}: HILSearchGifs) => {
    return (
      <>
          <h1>Search Gifs</h1>
        <div data-testid="search-gifs" style={{ marginBottom: '20px' }}>
          <input
          data-testid="search-gifs-input"
          id="searchGif"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for GIFs"
            className='search-input'
          />
          <button data-testid="search-gifs-btn" disabled={!query.trim()} onClick={handleSearch} className='search-btn' >
            Search
          </button>
        </div>
      </>
    )
  })

export default SearchGifs
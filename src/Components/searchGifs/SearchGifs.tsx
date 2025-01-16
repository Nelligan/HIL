import React from 'react'
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
        <div style={{ marginBottom: '20px' }}>
          <input
          data-testid="search-gifs-input"
          id="searchGif"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for GIFs"
            style={{ padding: '10px', width: '300px', marginRight: '10px' }}
          />
          <button data-testid="search-gifs-btn" disabled={!query.trim()} onClick={handleSearch} style={{ padding: '10px 20px' }}>
            Search
          </button>
        </div>
      </>
    )
  })

export default SearchGifs

import useFetchingData from '../../Hooks/useFetchingData/useFetchingData';
import TrendingGifs from '../../Components/trendingGifs/TrendingGifs';
import useSearch from '../../Hooks/useSearch/useSearch';
import SearchGifs from '../../Components/searchGifs/SearchGifs';
import './style/style.css'
const Home = () => {
const {query,
       setQuery,
       isSearching, 
       fetchCallback,  
       handleSearch} = useSearch()
 const {data: gifs,isLoading,isError} = useFetchingData({
    uniqueKey: isSearching ? `SearchingGifs-${query}` :"trendingGifs" ,
    stale: 5000,
    cache: 10000,
    cb: fetchCallback
 })

  return (
    <>
    <SearchGifs query={query} setQuery={setQuery} handleSearch={handleSearch}/>
   
      
    <TrendingGifs gifs={gifs} isLoading={isLoading} isError={isError} />
    
    </>
  )
}

export default Home
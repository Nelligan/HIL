
import React, { useCallback, useMemo } from 'react';
import useFetchingData from '../../Hooks/useFetchingData/useFetchingData';
import TrendingGifs from '../../Components/trendingGifs/TrendingGifs';
import useSearch from '../../Hooks/useSearch/useSearch';
import SearchGifs from '../../Components/searchGifs/SearchGifs';
import './style/style.css'


/**
 * For the pages we can automate the testing with cypress giving and E2E testing suite 
 */
const Home = React.memo(() => {
  const {
    query,
    setQuery,
    isSearching,
    fetchCallback,
    setIsSearching
  } = useSearch();

  const { data: gifs = [], isLoading, isError } = useFetchingData({
    uniqueKey: isSearching ? `SearchingGifs-${query}` : "trendingGifs",
    stale: 5000,
    cache: 10000,
    cb: fetchCallback,
  });

  const trendingGifsProps = useMemo(() => {
    return {
      gifs,
      isLoading, 
      isError
    }
  }, [gifs, isLoading, isError]);
  const searching = useCallback(() => {
    setIsSearching(true)
  }, [])
  return (
    <>
      <SearchGifs query={query} setQuery={setQuery} handleSearch={searching} />
      <TrendingGifs {...trendingGifsProps} />
    </>
  );
})

export default Home;

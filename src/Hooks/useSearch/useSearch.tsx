import { useCallback, useEffect, useRef, useState } from 'react'
import { getTrendingGifs } from '../../services/giphyService/giphyService';
import { searchGiphyService } from '../../services/searchGiphyService/searchGiphyService';
import { debounce } from 'lodash';

const useSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>(query);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Debounce query update
  useEffect(() => {
    const handler = debounce((val: string) => setDebouncedQuery(val), 300);
    handler(query);
    return () => handler.cancel();
  }, [query]);

  const fetchCallback = useCallback(() => {
    // Determine whether searching or trending based on query
    if (!query) return getTrendingGifs(20, 0);
    setIsSearching(true);
    return searchGiphyService(debouncedQuery);
  }, [query, debouncedQuery]);

  return { query, setQuery, isSearching, setIsSearching, fetchCallback };
}

export default useSearch



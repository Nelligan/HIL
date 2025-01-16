import { useCallback, useEffect, useRef, useState } from 'react'
import { getTrendingGifs } from '../../services/giphyService/giphyService';
import { searchGiphyService } from '../../services/searchGiphyService/searchGiphyService';
import { debounce } from 'lodash';

const useSearch = () => {
      const [query, setQuery] = useState<string>("")
      const [isSearching, setIsSearching] = useState<boolean>(false)
      const [debouncedQuery, setDebouncedQuery] = useState<string>(query);
    
      useEffect(() => {
        const handler = debounce((val: string) => setDebouncedQuery(val), 300);
        handler(query);
        return () => handler.cancel(); 
      }, [query]);

      const fetchCallback = useCallback(() => {
        if(query) setIsSearching(true)
        if(!query) setIsSearching(false)
         
        return isSearching && debouncedQuery ? searchGiphyService(debouncedQuery) : getTrendingGifs(20, 0);
      }, [isSearching, debouncedQuery, query]);

      const handleSearch = () => { 
        setIsSearching(true)
       
      };
  return {query,setQuery,isSearching,setIsSearching, fetchCallback, handleSearch}
}

export default useSearch



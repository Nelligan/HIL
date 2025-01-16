
import { useQuery } from 'react-query'
interface Props {
    uniqueKey: string
    stale: number
    cache: number
    cb: () => Promise<any>
}
const useFetchingData = ({ uniqueKey, stale, cache, cb }: Props) => {
    const {data, isLoading, isError} = useQuery(
        [uniqueKey], () => cb(),{
            staleTime: stale,
            cacheTime: cache,
            retry: 3,
        }
    )
  return {data,isLoading,isError}
}

export default useFetchingData
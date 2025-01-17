import axiosInstance from "../axiosInstance/axios.instance";
import { HILGifData } from "../sharedTypes";


export const searchGiphyService = async (query: string): Promise<HILGifData[]> => {
    if(!query.trim()) return []

    try {
        
        const response = await axiosInstance.get("/search",{
            params:{q: query}
        })

        return response.data.data
    } catch (error) {
        console.error('Error fetching Gifs', error)
        throw new Error('Failed to fetch Gifs')
    }
}
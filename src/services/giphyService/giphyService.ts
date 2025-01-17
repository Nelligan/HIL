import axiosInstance from "../axiosInstance/axios.instance";
import { HILGifData } from "../sharedTypes";


export const getTrendingGifs = async (limit = 25, offset = 0): Promise<HILGifData[]> => {
    try{
        const response = await axiosInstance.get(`/trending`, {
            params:{limit, offset}
        })
        return response.data.data
    }catch(error){
        console.error("Error fetching Gifs", error)
        throw new Error('Failed to get the gifs')
    }
}
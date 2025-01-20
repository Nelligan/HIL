import axiosInstance from "../axiosInstance/axios.instance";
import { errorMessages } from "../Error/error.messages";
import { HILGifData } from "../sharedTypes";


export const searchGiphyService = async (query: string): Promise<HILGifData[]> => {
    if(!query.trim()) return []

    try {
        
        const response = await axiosInstance.get("/search",{
            params:{q: query}
        })

        return response.data.data
    } catch (error) {
        errorMessages(error)
    }
}
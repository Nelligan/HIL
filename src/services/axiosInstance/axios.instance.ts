import axios from 'axios'
const API_KEY: string | undefined = import.meta.env.VITE_GIPHYKEY
const API_URL: string = 'https://api.giphy.com/v1/gifs'
if (!API_KEY) {
    throw new Error('API_KEY is not set. Please check your .env file.');
  }
const axiosInstance = axios.create({
    baseURL: API_URL,
    params: {
        api_key: API_KEY
    },
    timeout: 10000, // 10 sec timeout
    headers:{
        "Content-type": "application/json"
    }
})

/**
 * Add in some interceptors for requests, response , debugging or token managment
 */

axiosInstance.interceptors.request.use(
    (config) => {
        console.log('Request:', config)
        return config
    },
    (error) => {
        console.error('Request Error:', error)
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response:', response.data)
        return response
    },
    (error) => {
        console.error('Response Error:', error.response?.data || error.message)
        return Promise.reject(error)
    }
)

export default axiosInstance
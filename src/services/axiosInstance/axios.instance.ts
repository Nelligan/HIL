import axios from 'axios'
/**
 * I want to use the .env for the API KEY ( for some reason I cant test using => import.meta.env.VITE_GIPHYKEY )
 * So I am hard coding for now & ask if you guys can do it :) 
 * I have tried everything but can't seem to get it to work. I wouldn't put this to prod as it exposes the API KEY 
 * It sould be in the .env file
 */
const API_KEY: string | undefined = 'Jaxqrkut5V42pfzqAR2PDgUapeqrQDpd'
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
        console.error('Request Error:', error.message)
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response:', response.data)
        return response
    },
    (error) => {
        console.error('Response Error:', error.message)
        return Promise.reject(error)
    }
)

export default axiosInstance
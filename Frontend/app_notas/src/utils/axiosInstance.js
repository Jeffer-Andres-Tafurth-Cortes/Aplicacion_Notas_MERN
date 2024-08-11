// Se importa la libreria axios
import axios from 'axios'

// Se importa la URL base de la aplicacion
import { BASE_URL } from './constants'

// Se crea un nuevo axios instance con la URL base y el timeout por defecto
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeOut: 10000,
  headers: {
    "Content-Type": "application/json",
  }
})

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token')
    if(accessToken){
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
  return Promise.reject(error)
  }
)

export default axiosInstance
import axios from 'axios'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

function errorResponseHandler(error) {

  // if has response show the error 
  if (error.response.code == 401) {
      location.replace('/')
  }
}

service.interceptors.request.use(
  service.defaults.headers.common['Authorization'] = 'Bearer ' + getToken()
)

service.interceptors.response.use(
  response => response,
  errorResponseHandler
)
export default service
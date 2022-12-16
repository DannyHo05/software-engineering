import axios from "axios";
import Cookies from "js-cookie";
const axiosClient = axios.create({
    baseURL:process.env.NEXT_PUBLIC_BASE_URL,
    headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3001',
        'Access-Control-Allow-Credentials': 'true',
    }
})
axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers = {
      'Authorization': `${Cookies.get('token')}`,
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, async function (error) {
   
    const originalRequest = error.config;
    if(error.response.status === 401){
      const win: Window = window;
      win.location = '/auth/login'
      return error.response
    }
    if(error.response.status === 500){
      return error.response
    }
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await refreshAccessToken();            
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      return axiosClient(originalRequest);
    }
    return Promise.reject(error);
  });

export default axiosClient

function refreshAccessToken() {
  throw new Error("Function not implemented.");
}

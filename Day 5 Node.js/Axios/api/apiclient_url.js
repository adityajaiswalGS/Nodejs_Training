import axios from 'axios'
import 'dotenv/config'


const apiClient = axios.create({
    baseURL : 'https://dummyjson.com',
    timeout : 3000
})
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 404) {
      console.warn("Post not found! Redirecting...");
      alert("Post not found. Redirecting to login page...");
    }
    return Promise.reject(error);
  }
);


export default apiClient;

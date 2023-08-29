import axios, {type AxiosInstance} from 'axios';

//Axios instance config
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

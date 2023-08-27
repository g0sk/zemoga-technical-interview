import axios, {type AxiosInstance} from 'axios';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

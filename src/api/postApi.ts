import {axiosInstance} from '.';

const getPosts = (limit: number = 10) =>
  axiosInstance.get(`/posts?_limit=${limit}`);

export default {
  getPosts,
};

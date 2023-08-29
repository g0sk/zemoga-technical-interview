import {AxiosResponse} from 'axios';
import {axiosInstance} from '.';
import {Pagination} from '../store/postAsyncThunk';
import type {Post, User, CommentType} from '../store/postAsyncThunk';

const getAllPosts = (): Promise<AxiosResponse<Post[], any>> => {
  return axiosInstance.get('/posts');
};

const getPosts = ({
  currentPage,
  limit,
}: Pagination): Promise<AxiosResponse<Post[], any>> =>
  axiosInstance.get(`/posts?_page=${currentPage}&_limit=${limit}`);

const getPost = (postId: number): Promise<AxiosResponse<Post, any>> => {
  return axiosInstance.get(`/posts/${postId}`);
};

const deletePost = (postId: number): Promise<AxiosResponse<void, any>> => {
  return axiosInstance.delete(`/posts/${postId}`);
};

const getPostComments = (
  postId: number,
): Promise<AxiosResponse<CommentType[], any>> =>
  axiosInstance.get(`/posts/${postId}/comments`);

const getPostUser = (userId: number): Promise<AxiosResponse<User, any>> =>
  axiosInstance.get(`/users/${userId}`);

export default {
  getAllPosts,
  getPosts,
  getPost,
  getPostUser,
  getPostComments,
  deletePost,
};

import {createAsyncThunk} from '@reduxjs/toolkit';
import PostApi from '../api/postApi';
import {clearPosts} from './postSlice';

export type Post = {
  id: number;
  user: number;
  title: string;
  body: string;
};

export type Pagination = {
  currentPage: number;
  limit: number;
};

export type CommentType = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: number;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
  phone: number;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

type FetchPostsResponse = Post[];

export const fetchAllPosts = createAsyncThunk<
  FetchPostsResponse,
  void,
  {rejectValue: string}
>('post/fetchAllPosts', async () => {
  try {
    const res = await PostApi.getAllPosts();
    return res.data;
  } catch (e) {
    throw e;
  }
});

export const fetchPosts = createAsyncThunk<
  FetchPostsResponse,
  Pagination,
  {rejectValue: string}
>('post/fetchPosts', async ({currentPage, limit}) => {
  try {
    const res = await PostApi.getPosts({currentPage, limit});
    return res.data;
  } catch (e) {
    throw e;
  }
});

export const fetchPostDetails = createAsyncThunk<void, number, {}>(
  'post/fetchPostDetails',
  async (postId, {dispatch}) => {
    dispatch(fetchPost(postId));
    dispatch(fetchPostComments(postId));
    dispatch(fetchPostUser(postId));
  },
);

export const fetchPost = createAsyncThunk<Post, number, {}>(
  'post/fetchPost',
  async (postId, thunkAPI) => {
    const res = await PostApi.getPost(postId);
    return res.data;
  },
);

export const fetchPostComments = createAsyncThunk<CommentType[], number, {}>(
  'post/fetchPostComments',
  async (postId, thunkAPI) => {
    const res = await PostApi.getPostComments(postId);
    return res.data;
  },
);

export const fetchPostUser = createAsyncThunk<User, number, {}>(
  'post/fetchPostUser',
  async (userId, thunkAPI) => {
    const res = await PostApi.getPostUser(userId);
    return res.data;
  },
);

export const deletePost = createAsyncThunk<void, number, {}>(
  'post/deletePost',
  async (postId, thunkAPI) => {
    try {
      await PostApi.deletePost(postId);
      thunkAPI.dispatch(clearPosts());
      thunkAPI.dispatch(fetchPosts({currentPage: 1, limit: 10}));
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

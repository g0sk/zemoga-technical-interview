import {createAsyncThunk} from '@reduxjs/toolkit';
import PostApi from '../api/postApi';
import {clearPosts} from './postSlice';
import {AxiosError} from 'axios';

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
>('post/fetchAllPosts', async (_, {rejectWithValue}) => {
  try {
    const res = await PostApi.getAllPosts();
    return res.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return rejectWithValue(`${e.code}: ${e.message}`);
    } else {
      throw e;
    }
  }
});

export const fetchPosts = createAsyncThunk<
  FetchPostsResponse,
  Pagination,
  {rejectValue: string}
>('post/fetchPosts', async ({currentPage, limit}, {rejectWithValue}) => {
  try {
    const res = await PostApi.getPosts({currentPage, limit});
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return rejectWithValue(`${e.code}: ${e.message}`);
    } else {
      throw e;
    }
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

export const fetchPost = createAsyncThunk<Post, number, {rejectValue: string}>(
  'post/fetchPost',
  async (postId, {rejectWithValue}) => {
    try {
      const res = await PostApi.getPost(postId);
      return res.data;
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        return rejectWithValue(`${e.code}: ${e.message}`);
      } else {
        throw e;
      }
    }
  },
);

export const fetchPostComments = createAsyncThunk<
  CommentType[],
  number,
  {rejectValue: string}
>('post/fetchPostComments', async (postId, {rejectWithValue}) => {
  try {
    const res = await PostApi.getPostComments(postId);
    return res.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return rejectWithValue(`${e.code}: ${e.message}`);
    } else {
      throw e;
    }
  }
});

export const fetchPostUser = createAsyncThunk<
  User,
  number,
  {rejectValue: string}
>('post/fetchPostUser', async (userId, {rejectWithValue}) => {
  try {
    const res = await PostApi.getPostUser(userId);
    return res.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return rejectWithValue(`${e.code}: ${e.message}`);
    } else {
      throw e;
    }
  }
});

export const deletePost = createAsyncThunk<void, number, {}>(
  'post/deletePost',
  async (postId, thunkAPI) => {
    try {
      await PostApi.deletePost(postId);
      thunkAPI.dispatch(clearPosts());
      thunkAPI.dispatch(fetchPosts({currentPage: 1, limit: 10}));
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        return thunkAPI.rejectWithValue(`${e.code}: ${e.message}`);
      } else {
        throw e;
      }
    }
  },
);

import {createSlice} from '@reduxjs/toolkit';
import {
  CommentType,
  User,
  deletePost,
  fetchAllPosts,
  fetchPost,
  fetchPostComments,
  fetchPostUser,
  fetchPosts,
} from './postAsyncThunk';

export type Post = {
  id: number;
  user: number;
  title: string;
  body: string;
  favourite: boolean;
};

type PostsState = {
  allPosts: Post[];
  posts: Post[];
  post: Post | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPage: number;
  favourites: Post[];
  comments: CommentType[];
  user: User | null;
};

const initialState: PostsState = {
  allPosts: [],
  posts: [],
  post: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPage: 1,
  favourites: [],
  comments: [],
  user: null,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      state.favourites.unshift({...action.payload.post, favourite: true});
      state.posts.splice(action.payload.index, 1);
      state.allPosts = state.favourites.concat(state.posts);
    },
    removeFavourite: (state, action) => {
      state.posts.push({...action.payload.post, favourite: false});
      state.favourites.splice(action.payload.index, 1);
      state.allPosts = state.favourites.concat(state.posts);
    },
    removeAllPostsExceptFavourites: state => {
      state.posts = [];
    },
    resetCurrentPage: state => {
      state.currentPage = 1;
    },
    removeAllPosts: state => {
      state.posts = [];
      state.allPosts = state.favourites;
    },
    clearPosts: state => {
      state.allPosts = [];
      state.posts = [];
      state.favourites = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllPosts.fulfilled, (state, {payload}) => {
        const posts = payload.map(p => ({
          ...p,
          favourite: false,
        }));
        state.posts = posts;
        state.allPosts = posts;
        state.currentPage = 1;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAllPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.rejected, (state, {payload}) => {
        state.loading = false;
        if (payload) {
          state.error = payload.toString();
        }
        state.posts = [];
      })
      .addCase(fetchPosts.fulfilled, (state, {payload}) => {
        const posts = payload.map(p => ({
          ...p,
          favourite: false,
        }));
        state.posts.push(...posts);
        state.allPosts.push(...posts);
        if (state.currentPage < 10) {
          state.currentPage = state.currentPage + 1;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, {payload}) => {
        state.loading = false;
        if (payload) {
          state.error = payload.toString();
        }
        state.posts = [];
      })
      .addCase(fetchPost.fulfilled, (state, {payload}) => {
        state.post = {...payload, favourite: false};
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPost.rejected, (state, {payload}) => {
        state.loading = false;
        if (payload) {
          state.error = payload.toString();
        }
        state.posts = [];
      })
      .addCase(fetchPostComments.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.error = null;
        state.comments = [...payload];
      })
      .addCase(fetchPostComments.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostComments.rejected, (state, {payload}) => {
        state.loading = false;
        if (payload) {
          state.error = '';
        }
      })
      .addCase(fetchPostUser.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(fetchPostUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostUser.rejected, (state, {payload}) => {
        state.loading = false;
        if (payload) {
          state.error = '';
        }
      })
      .addCase(deletePost.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deletePost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, payload) => {
        state.loading = false;
        if (payload) {
          state.error = '';
        }
      });
  },
});

export const {
  addFavourite,
  removeFavourite,
  removeAllPostsExceptFavourites,
  resetCurrentPage,
  removeAllPosts,
  clearPosts,
} = postSlice.actions;

export default postSlice.reducer;

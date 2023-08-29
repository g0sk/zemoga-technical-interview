import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import postReducer from './postSlice';

export const store = configureStore({
  reducer: {
    post: postReducer,
  },
  middleware: getDefaultMiddleware => {
    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default;

      return getDefaultMiddleware().concat(createDebugger());
    }

    return getDefaultMiddleware();
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;

// store.ts
import { configureStore } from '@reduxjs/toolkit';
import {formSlice} from './reducers/UserReducer';
import { comformSlice } from './reducers/CommentReducer';

const store = configureStore({
  reducer: {
    form: formSlice.reducer,
    commentform: comformSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


export const Server = "https://fyp-server-dh91.onrender.com/api/v1";
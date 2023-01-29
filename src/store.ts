import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { surveySlice } from "./features/Survey/surveySlice";

export const store = configureStore({
  reducer: {
    survey: surveySlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

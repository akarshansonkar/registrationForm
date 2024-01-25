import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./components/user/userReducer/userSlice";
import allUserReducer from "./components/user/userReducer/allUserSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		allUsers: allUserReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

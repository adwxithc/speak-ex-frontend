import {configureStore} from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import adminReducer from './features/admin/adminSlice';
import languageListReducer from './features/admin/languageSlice'
import usersListReducer from './features/admin/usersListSlice';
import {apiSlice} from './basApiSlice'


const store = configureStore({
    reducer:{
        user:userReducer,
        admin:adminReducer,
        usersList:usersListReducer,
        language:languageListReducer,
        [apiSlice.reducerPath]:apiSlice.reducer
        
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})
// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
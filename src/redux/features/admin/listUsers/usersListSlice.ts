import { createSlice } from "@reduxjs/toolkit";
import { usersListInitialState as initialState } from "../initialState";
const usersListSlice = createSlice({
    name:'usersList',
    initialState,
    reducers:{
        setUsersList:(state, action)=>{
            state.usersList=action.payload;
        },
        setUserPaginationData:(state,action)=>{
            // state.page=action.payload.page;
            state.totalUsers=action.payload.totalUsers;
            // state.limit=action.payload.limit;
        }
        
    }
})

export const {setUsersList,setUserPaginationData} =usersListSlice.actions
export default usersListSlice.reducer
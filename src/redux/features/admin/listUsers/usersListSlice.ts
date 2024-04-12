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
        },
        updateUserData:(state,action)=>{
           
            const updatedUserIndex = state.usersList.findIndex(user => user.id === action.payload.id);
            state.usersList[updatedUserIndex] = action.payload;
            
        }
        
    }
})

export const {setUsersList,setUserPaginationData, updateUserData} =usersListSlice.actions
export default usersListSlice.reducer
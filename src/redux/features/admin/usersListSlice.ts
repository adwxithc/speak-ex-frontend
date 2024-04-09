import { createSlice } from "@reduxjs/toolkit";
import { usersListInitialState as initialState } from "./initialState";
const usersListSlice = createSlice({
    name:'usersList',
    initialState,
    reducers:{
        setUsersList:(state, action)=>{
            state.usersList=action.payload;
        },
        
    }
})

export const {setUsersList} =usersListSlice.actions
export default usersListSlice.reducer
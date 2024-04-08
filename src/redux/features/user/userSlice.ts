import { createSlice } from "@reduxjs/toolkit";
import { userInitialState as initialState } from "./initialState";
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        logUser:(state, action)=>{

            state.userData=action.payload;
            state.isAuth=true
        },
        logoutUser: (state) => {
            state.isAuth = false;
            state.userData = null;
        },
        
    }
})

export const {logUser,logoutUser} =userSlice.actions
export default userSlice.reducer
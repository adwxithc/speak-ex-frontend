import { createSlice } from "@reduxjs/toolkit";
import { userInitialState as initialState } from "./initialState";
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        logUser:(state, action)=>{

            state.userData=action.payload;
            state.isAuth=true
            localStorage.setItem('userData',JSON.stringify(action.payload))
        },
        logoutUser: (state) => {
            state.isAuth = false;
            state.userData = null;
            localStorage.removeItem('userData')
        },
    }
})

export const {logUser,logoutUser} =userSlice.actions
export default userSlice.reducer
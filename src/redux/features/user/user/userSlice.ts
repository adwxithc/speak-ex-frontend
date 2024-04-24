import { createSlice } from "@reduxjs/toolkit";
import { userInitialState as initialState } from "../initialState";
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        logUser:(state, action)=>{
            const data ={...state.userData,...action.payload}
            state.userData=data;
            state.isAuth=true
            localStorage.setItem('userData',JSON.stringify(data))
        },
        logoutUser: (state) => {
            state.isAuth = false;
            state.userData = null;
            localStorage.removeItem('userData')
        },
        updateUser:(state,action)=>{
            const data={...state.userData,...action.payload}
            state.userData=data
            localStorage.setItem('userData',JSON.stringify(data))
        }
    }
})

export const {logUser,logoutUser,updateUser} =userSlice.actions
export default userSlice.reducer
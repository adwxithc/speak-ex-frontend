import { createSlice } from "@reduxjs/toolkit";
import { adminInitialState as initialState } from "../initialState";
const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        logAdmin:(state, action)=>{
            
            
            state.adminData=action.payload;
            state.isAuth=true
            localStorage.setItem('adminData',JSON.stringify(action.payload))
        },
        logoutAdmin: (state) => {
            state.isAuth = false;
            state.adminData = null;
            localStorage.removeItem('adminData')
        },
        
        
    }
})

export const {logAdmin,logoutAdmin} =adminSlice.actions
export default adminSlice.reducer
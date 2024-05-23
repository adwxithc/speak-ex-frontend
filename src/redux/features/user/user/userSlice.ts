import { createSlice } from "@reduxjs/toolkit";
import { userInitialState as initialState } from "../initialState";
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setCridentials:(state, action)=>{
            const data ={...state.userData,...action.payload}
            state.userData=data;
            state.isAuth=true
            localStorage.setItem('userData',JSON.stringify(data))
        },
        removeCridentials: (state) => {
            state.isAuth = false;
            state.userData = null;
       
            localStorage.removeItem('userData')
        
        },
        updateCridentials:(state,action)=>{
            const data={...state.userData,...action.payload}
            state.userData=data
            localStorage.setItem('userData',JSON.stringify(data))
        },
      
    }
})

export const {removeCridentials,setCridentials,updateCridentials} =userSlice.actions
export default userSlice.reducer
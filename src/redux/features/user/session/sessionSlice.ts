import { createSlice } from "@reduxjs/toolkit";
import { sessionInitialState as initialState} from './initialState'

const sessionSlice = createSlice({
    name:'session',
    initialState,
    reducers:{
        resetSession:(state)=>{
            Object.assign(state, initialState);
        },
        setSession:(state, action)=>{
            state ={...state,...action.payload}
        },
       
    }
})

export const {resetSession,setSession} =sessionSlice.actions
export default sessionSlice.reducer
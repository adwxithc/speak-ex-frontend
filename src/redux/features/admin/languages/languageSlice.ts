import { createSlice } from "@reduxjs/toolkit";
import { languageListInitialState as initialState } from "../initialState";
const languageListSlice = createSlice({
    name:'languageList',
    initialState,
    reducers:{
        setLanguageList:(state, action)=>{
            state.languageList=action.payload;
        },
        
    }
})

export const {setLanguageList} =languageListSlice.actions
export default languageListSlice.reducer
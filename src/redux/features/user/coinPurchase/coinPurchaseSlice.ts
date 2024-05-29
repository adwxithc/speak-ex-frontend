import { createSlice } from "@reduxjs/toolkit";
import { coinPurchaseInitialState as initialState } from "./initialState"

const coinPurchaseSlice = createSlice({
    name:'coinPurchase',
    initialState,
    reducers:{
        setOpenStore:(state, action)=>{
            state.storeOpen=action.payload;
        },
       
    }
})

export const {setOpenStore} =coinPurchaseSlice.actions
export default coinPurchaseSlice.reducer
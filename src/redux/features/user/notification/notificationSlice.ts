import { createSlice } from "@reduxjs/toolkit";
import { notificationInitialState as initialState } from "./initialState"

const notificationSlice = createSlice({
    name:'coinPurchase',
    initialState,
    reducers:{
        pushNotifications:(state, action)=>{
        
            if(state.notifications!==null){
                state.notifications=[...state.notifications,...action.payload ];
            }else{
                state.notifications=action.payload;
            }
            
        },
        addNewNotification:(state,action)=>{
            state.notifications=[action.payload, ...state.notifications||[] ];

        },
        
        setHasMore:(state, action)=>{
           
            state.hasMore=action.payload;
        },
        setPage:(state, action)=>{
           
            state.page=action.payload;
        },
       setNextPage:(state)=>{
        // if(state.page==state.nextPage)
        state.nextPage=state.nextPage+1
       }
    }
})

export const {pushNotifications,setHasMore, setPage,setNextPage,addNewNotification} =notificationSlice.actions
export default notificationSlice.reducer
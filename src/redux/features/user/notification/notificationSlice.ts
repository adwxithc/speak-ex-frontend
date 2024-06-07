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
        setNotifications:(state, action)=>{
            state.notifications=action.payload;
        },
        setHasMore:(state, action)=>{
           
            state.hasMore=action.payload;
        },
        setPage:(state, action)=>{
           
            state.page=action.payload;
        },
       setNextPage:(state)=>{
       
        state.nextPage=state.nextPage+1
       },
       setUnreadedNotificationCount:(state,action)=>{
        state.unreadedNotifications=action.payload
       }
    }
})

export const {pushNotifications,setHasMore, setPage,setNextPage,addNewNotification,setNotifications,setUnreadedNotificationCount} =notificationSlice.actions
export default notificationSlice.reducer
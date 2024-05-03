import { apiSlice } from '../../../apiSlice';

const CHAT_URL = '/api/chat';

export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getChatRooms: builder.query({
            query: (data) => `${CHAT_URL}/${data.userId}?key=${data.key}`
        }),
        getMessages:builder.mutation({
            query:(data)=>({
                url:`${CHAT_URL}/${data.roomId}/messages?page=${data.page}`,
                method:'GET',
            
            })
        }),
        sendMessage:builder.mutation({
            query: (data) => ({
                url: `${CHAT_URL}/${data.roomId}/message`,
                method: 'POST',
                body:data.messageData
            }),
        }),
        setMessageSeen:builder.mutation({
            query: (data) => ({
                url: `${CHAT_URL}/${data.roomId}/chat/seen`,
                method: 'PUT',
               body:{senderId:data.senderId}
            }),
        }),
        
})
})


export const {
    useGetChatRoomsQuery,
    useGetMessagesMutation,
    useSendMessageMutation,
    useSetMessageSeenMutation
  
} = chatApiSlice;

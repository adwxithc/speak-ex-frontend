import { apiSlice } from '../../../apiSlice';

const CHAT_URL = '/api/chat';

export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getChatRooms: builder.query({
            query: (data) => `${CHAT_URL}/${data.userId}`
        }),
        getMessages:builder.query({
            query:(data)=>`${CHAT_URL}/${data.roomId}/messages?page=${1}&limit=${5}`
        }),
        sendMessage:builder.mutation({
            query: (data) => ({
                url: `${CHAT_URL}/${data.roomId}/message`,
                method: 'POST',
                body:data.messageData
            }),
        })
})
})


export const {
    useGetChatRoomsQuery,
    useGetMessagesQuery,
    useSendMessageMutation
  
} = chatApiSlice;

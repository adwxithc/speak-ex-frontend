import { useCallback, useEffect, useState } from "react"
import IUser, { IMessage } from "../../../../types/database"
import { useSocket } from "../../../../context/SocketProvider"
import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"

function useLiveChat(remoteUser: Required<IUser> | null) {
  const [messages, setMessages] = useState<IMessage[]>([])
  const socket = useSocket()
  const { userData } = useSelector((state: RootState) => state.user)

  const handleSendMessage = async (text: string, cb: () => void) => {

    if (!text || !remoteUser) return
    const receiverId = remoteUser.id

    socket?.emit("sendMessage", {
      senderId: userData?.id,
      receiverId,
      text: text,
    });
    const newMessage = {
      id: Date.now().toString(),
      senderId: userData?.id as string,
      text,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      seen: true,
      roomId: ''
    }
    setMessages(prev => [...prev, newMessage])
    cb()
  }

  const handleGetMessage = useCallback((data: { senderId: string, text: string }) => {
    const newMessage = {
      id: Date.now().toString(),
      senderId: data.senderId,
      text: data.text,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      seen: true,
      roomId: ''
    }
    setMessages((prev) => [...prev, newMessage]);
  }, [setMessages])

  useEffect(() => {

    socket?.on("getMessage", handleGetMessage);

    return () => {
      socket?.off("getMessage", handleGetMessage);

    }
  }, [handleGetMessage, socket]);

  return {
    handleSendMessage,
    messages
  }
}

export default useLiveChat

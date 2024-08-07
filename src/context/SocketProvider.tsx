
import { ReactNode, createContext, useContext, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { Socket, io} from 'socket.io-client';
import { RootState } from '../redux/store';

const SocketContext = createContext<Socket|null>(null)


interface IContextProviderProps{
    children:ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket=()=>{
    const socket = useContext(SocketContext)
    return socket
}


export function SocketProvider({children}:IContextProviderProps) {

    const {userData} =useSelector((state:RootState)=>state.user)

    const socket:Socket = useMemo(()=>io( import.meta.env.VITE_BACKEND_URL),[])
    useEffect(()=>{
      if(!userData?.id) return 
      socket.emit('addUser',{userId:userData?.id})
    },[socket, userData?.id])
    
  return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
  )
}



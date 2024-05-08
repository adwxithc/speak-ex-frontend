
import { ReactNode, createContext, useContext, useMemo } from 'react'
import { Socket, io} from 'socket.io-client';

const SocketContext = createContext<Socket|null>(null)


interface IContextProviderProps{
    children:ReactNode
}

export const useSocket=()=>{
    const socket = useContext(SocketContext)
    return socket
}


export function SocketProvider({children}:IContextProviderProps) {
    const socket:Socket = useMemo(()=>io("http://10.0.13.94:5000/"),[])
  return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
  )
}



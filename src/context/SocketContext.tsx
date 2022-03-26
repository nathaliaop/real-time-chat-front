import { createContext, useContext, useState } from 'react'
import { io } from 'socket.io-client';
import { useToken } from './TokenContext';

type SocketContextType = {
  socket: any;
}

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children } : any ) => {

    const { token } = useToken();

    const socketOptions = {
        transportOptions: {
            polling: {
                extraHeaders: {
                    Authorization: 'Bearer ' + token
                }
            }
        }
    };
    
    const socket = io('http://localhost:5050', socketOptions);

  return (
    <SocketContext.Provider value={{ socket }}>
      { children }
    </SocketContext.Provider>
  )
};

export const useSocket = () => {
  const socketContext = useContext(SocketContext);
  if (!socketContext) throw new Error('Socket null');
  return socketContext;
}
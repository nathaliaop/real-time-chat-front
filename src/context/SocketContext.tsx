import { createContext, useContext } from 'react'
import { io, Socket } from 'socket.io-client';
import env from 'react-dotenv';
import { useToken } from './TokenContext';

type SocketContextType = {
  socket: Socket;
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

  const socket = io(env.API_URL, socketOptions);


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
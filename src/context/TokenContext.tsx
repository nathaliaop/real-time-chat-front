import { createContext, useContext, useState } from 'react'

type TokenContextType = {
  token: string;
  setToken: (token: string) => void;
  setUserId: (userId: number) => void; 
  userId: number
}

export const TokenContext = createContext<TokenContextType | null>(null);

export const TokenProvider = ({ children } : any ) => {
  const [token, setTokenContext] = useState<string>(localStorage.getItem('token') || '');
  const [userId, setUserIdContext] = useState<number>(parseInt(localStorage.getItem('userId') || ''));

  const setToken = (token: string) => {
    localStorage.setItem('token', token);
    setTokenContext(token);
  }

  const setUserId = (userId: number) => {
    localStorage.setItem('userId', String(userId));
    setUserIdContext(userId);
  }

  return (
    <TokenContext.Provider value={{ token, setToken, setUserId, userId }}>
      { children }
    </TokenContext.Provider>
  )
};

export const useToken = () => {
  const tokenContext = useContext(TokenContext);
  if (!tokenContext) throw new Error('Token null');
  return tokenContext;
}
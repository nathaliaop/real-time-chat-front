import { createContext, useContext, useState } from 'react'

type TokenContextType = {
  token: string;
  setToken: (token: string) => void;
}

export const TokenContext = createContext<TokenContextType | null>(null);

export const TokenProvider = ({ children } : any ) => {
  const [token, setTokenContext] = useState<string>(localStorage.getItem('token') || '');

  const setToken = (token: string) => {
    localStorage.setItem('token', token);
    setTokenContext(token);
  }

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      { children }
    </TokenContext.Provider>
  )
};

export const useToken = () => {
  const tokenContext = useContext(TokenContext);
  if (!tokenContext) throw new Error('Token null');
  return tokenContext;
}
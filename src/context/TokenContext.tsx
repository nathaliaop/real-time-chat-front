import { createContext, useState } from 'react'

type TokenContextType = {
  token: string;
  setToken: (token: string) => void;
}


export const TokenContext = createContext<TokenContextType | null>(null);

export const TokenProvider = ({ children } : any ) => {
  const [token, setTokenContext] = useState<string>(sessionStorage.getItem('token') || '');

  const setToken = (token: string) => {
    sessionStorage.setItem('token', token);
    setTokenContext(token);
  }

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      { children }
    </TokenContext.Provider>
  )
};
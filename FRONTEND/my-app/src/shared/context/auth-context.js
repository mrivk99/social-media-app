
import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {}
});
{/**Use context to manage App wide state, 
so that you don't need to pass state as prop every time, 
you render a component. */}
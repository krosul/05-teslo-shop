import {createContext} from 'react';
import {IUser} from 'interfaces';

export interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;
  logginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<{
    hasError: boolean;
    message?: string;
  }>;
  logoutUser: () => void;
}
export const AuthContext = createContext({} as ContextProps);

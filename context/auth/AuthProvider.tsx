import {FC, ReactNode, useReducer} from 'react';
import {AuthContext, AuthReducer} from './';
import {IUser} from 'interfaces';
import {tesloApi} from 'api';
import Cookies from 'js-cookie';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

interface Props {
  children: ReactNode;
}

export const AuthProVider: FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, AUTH_INITIAL_STATE);

  const logginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const {data} = await tesloApi.post('/user/login', {email, password});
      const {token, user} = data;
      Cookies.set('token', token);
      dispatch({type: 'Auth - Login', payload: user});
      return true;
    } catch (err) {
      return false;
    }
  };

  return <AuthContext.Provider value={{...state, logginUser}}>{children}</AuthContext.Provider>;
};

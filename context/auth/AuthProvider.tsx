import {FC, ReactNode, useReducer, useEffect} from 'react';
import {AuthContext, AuthReducer} from './';
import {IUser} from 'interfaces';
import {tesloApi} from 'api';
import Cookies from 'js-cookie';
import axios from 'axios';
import {useRouter} from 'next/router';

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
  const router = useRouter();
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    if (!Cookies.get('token')) return;
    try {
      const {data} = await tesloApi('/user/valid-token');

      const {
        token: tokenDb,
        user,
        message,
      } = data as {token: string; user: IUser; message?: string};
      if (message) {
        Cookies.remove('token');
        dispatch({type: 'Auth - Logout'});
        return;
      }
      Cookies.set('token', tokenDb);

      dispatch({type: 'Auth - Login', payload: user});
    } catch (err) {
      Cookies.remove('token');
      return;
    }
  };

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

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{
    hasError: boolean;
    message?: string;
  }> => {
    try {
      const {data} = await tesloApi.post('/user/register', {email, password, name});
      const {token, user} = data;
      Cookies.set('token', token);
      console.log({data});
      dispatch({type: 'Auth - Login', payload: user});
      return {
        hasError: false,
        message: '',
      };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return {
          hasError: true,
          message: err.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: 'No se pudo crear el usuario - intente de nuevo',
      };
    }
  };

  const logoutUser = () => {
    Cookies.remove('token');
    Cookies.remove('cart');
    router.reload();
    return;
  };

  return (
    <AuthContext.Provider value={{...state, logginUser, registerUser, logoutUser}}>
      {children}
    </AuthContext.Provider>
  );
};

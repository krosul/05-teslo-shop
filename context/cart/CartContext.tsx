import { ICart } from 'interfaces';
import { createContext } from 'react';

export interface ContextProps {
  cart: ICart[];
}
export const CartContext = createContext({} as ContextProps);

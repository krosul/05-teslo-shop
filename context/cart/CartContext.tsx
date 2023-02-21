import { ICart } from 'interfaces';
import { createContext } from 'react';

export interface ContextProps {
  cart: ICart[];
  addProductInCart: (product: ICart[]) => void;
  updateCartQuantity: (product: ICart) => void;
}
export const CartContext = createContext({} as ContextProps);

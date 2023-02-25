import {ICart} from 'interfaces';
import {createContext} from 'react';

export interface ContextProps {
  cart: ICart[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  isLoaded: boolean;
  addProductInCart: (product: ICart[]) => void;
  updateCartQuantity: (product: ICart) => void;
  deleteProductInCart: (Product: ICart) => void;
}
export const CartContext = createContext({} as ContextProps);

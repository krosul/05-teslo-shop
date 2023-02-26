import {ICart} from 'interfaces';
import {createContext} from 'react';
import {ShippingAddress} from './CartProvider';

export interface ContextProps {
  cart: ICart[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  isLoaded: boolean;
  shippingAddress?: ShippingAddress;

  addProductInCart: (product: ICart[]) => void;
  updateCartQuantity: (product: ICart) => void;
  deleteProductInCart: (Product: ICart) => void;
  updateAddress: (data: ShippingAddress) => void;
}
export const CartContext = createContext({} as ContextProps);

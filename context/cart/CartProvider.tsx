import { FC, ReactNode, useReducer } from 'react';
import { CartContext, CartReducer } from '.';
import { ICart } from 'interfaces';

export interface CartState {
  cart: ICart[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

interface Props {
  children: ReactNode;
}

export const CartProVider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, CART_INITIAL_STATE);

  return (
    <CartContext.Provider value={{ ...state }}>{children}</CartContext.Provider>
  );
};

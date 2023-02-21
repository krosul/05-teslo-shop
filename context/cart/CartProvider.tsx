import { FC, ReactNode, useReducer, useEffect } from 'react';
import Cookie from 'js-cookie';
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

  useEffect(() => {
    const productsInCookies = Cookie.get('cart')
      ? JSON.parse(Cookie.get('cart')!)
      : [];
    dispatch({
      type: 'Cart - LoadCart from cookies | storage',
      payload: productsInCookies,
    });
  }, []);

  useEffect(() => {
    if (state.cart.length) {
      Cookie.set('cart', JSON.stringify(state.cart));
    }
  }, [state.cart]);

  const addProductInCart = (product: ICart[]) => {
    console.log(product);
    dispatch({ type: 'Cart - Add product', payload: product });
  };

  const updateCartQuantity = (product: ICart) => {
    dispatch({ type: 'Cart - Update quantity', payload: product });
  };

  return (
    <CartContext.Provider
      value={{ ...state, addProductInCart, updateCartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

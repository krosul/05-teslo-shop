import {FC, ReactNode, useReducer, useEffect} from 'react';
import Cookie from 'js-cookie';
import {CartContext, CartReducer} from '.';
import {ICart} from 'interfaces';
import {Product} from 'models';

export interface CartState {
  cart: ICart[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

interface Props {
  children: ReactNode;
}

export const CartProVider: FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(CartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    const productsInCookies = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
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

  useEffect(() => {
    const numberOfItems = state.cart.reduce((counter, actual) => actual.quantify + counter, 0);
    const subTotal = state.cart.reduce(
        (counter, actual) =>
          actual.quantify > 1 ? actual.quantify * actual.price + counter : actual.price + counter,
        0
      ),
      taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const orderSumary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    };
    console.log(orderSumary);
  }, [state.cart]);

  const addProductInCart = (product: ICart[]) => {
    console.log(product);
    dispatch({type: 'Cart - Add product', payload: product});
  };

  const updateCartQuantity = (product: ICart) => {
    dispatch({type: 'Cart - Update quantity', payload: product});
  };
  const deleteProductInCart = (product: ICart) => {
    dispatch({type: 'Cart - Delete product', payload: product});
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductInCart,
        updateCartQuantity,
        deleteProductInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

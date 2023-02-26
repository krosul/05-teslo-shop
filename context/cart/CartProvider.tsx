import {FC, ReactNode, useReducer, useEffect} from 'react';
import Cookie from 'js-cookie';
import {CartContext, CartReducer} from '.';
import {ICart} from 'interfaces';
import {Product} from 'models';
import Cookies from 'js-cookie';

export interface CartState {
  cart: ICart[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  isLoaded: boolean;
  shippingAddress?: ShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  isLoaded: false,
  shippingAddress: undefined,
};
export interface ShippingAddress {
  name: string;
  lastName: string;
  address: string;
  address2: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
}

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
    dispatch({type: 'Cart - Update order summary', payload: orderSumary});
  }, [state.cart]);

  useEffect(() => {
    if (Cookies.get('name') !== undefined) {
      const shippingAddres = {
        name: Cookies.get('name') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',
      };
      dispatch({type: 'Cart - Load Address from Cookies', payload: shippingAddres});
    }
  }, []);

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
  const updateAddress = (data: ShippingAddress) => {
    Cookies.set('name', data.name);
    Cookies.set('lastName', data.lastName);
    Cookies.set('address', data.address);
    Cookies.set('address2', data.address2 || '');
    Cookies.set('zip', data.zip);
    Cookies.set('city', data.city);
    Cookies.set('country', data.country);
    Cookies.set('phone', data.phone);
    dispatch({type: 'Cart - Update Address from Cookies', payload: data});
  };
  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductInCart,
        updateCartQuantity,
        deleteProductInCart,
        updateAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

import {ICart} from 'interfaces';
import {CartState} from '.';
import {stat} from 'fs';
import {ShippingAddress} from './CartProvider';

interface orderSumary {
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

type CartActionType =
  | {
      type: 'Cart - LoadCart from cookies | storage';
      payload: ICart[];
    }
  | {
      type: 'Cart - Add product';
      payload: ICart[];
    }
  | {type: 'Cart - Update quantity'; payload: ICart}
  | {type: 'Cart - Delete product'; payload: ICart}
  | {type: 'Cart - Update order summary'; payload: orderSumary}
  | {type: 'Cart - Load Address from Cookies'; payload: ShippingAddress}
  | {type: 'Cart - Update Address from Cookies'; payload: ShippingAddress};

export const CartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case 'Cart - LoadCart from cookies | storage':
      return {
        ...state,
        isLoaded: true,
        cart: action.payload,
      };
    case 'Cart - Add product':
      return {
        ...state,
        cart: action.payload,
      };
    case 'Cart - Update quantity':
      return {
        ...state,
        cart: state.cart.map((pro) => {
          if (pro._id === action.payload._id && pro.size === action.payload.size) {
            pro.quantify = action.payload.quantify!;
          }
          return pro;
        }),
      };
    case 'Cart - Delete product': {
      return {
        ...state,
        cart: state.cart.filter((pro) => {
          if (pro._id === action.payload._id && pro.size === action.payload.size) {
            return;
          }
          return pro;
        }),
      };
    }
    case 'Cart - Update order summary':
      return {
        ...state,
        ...action.payload,
      };
    case 'Cart - Update Address from Cookies':
    case 'Cart - Load Address from Cookies':
      return {
        ...state,
        shippingAddress: action.payload,
      };
    default:
      return state;
  }
};

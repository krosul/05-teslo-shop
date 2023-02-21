import { ICart } from 'interfaces';
import { CartState } from '.';

type CartActionType =
  | {
      type: 'Cart - LoadCart from cookies | storage';
      payload: ICart[];
    }
  | {
      type: 'Cart - Add product';
      payload: ICart[];
    }
  | { type: 'Cart - Update quantity'; payload: ICart };

export const CartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case 'Cart - LoadCart from cookies | storage':
      return {
        ...state,
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
          if (
            pro._id === action.payload._id &&
            pro.size === action.payload.size
          ) {
            pro.quantify = action.payload.quantify!;
          }
          return pro;
        }),
      };
    default:
      return state;
  }
};

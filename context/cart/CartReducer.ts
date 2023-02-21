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
    };

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
    default:
      return state;
  }
};

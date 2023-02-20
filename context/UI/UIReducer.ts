import { UIState } from './';

type UIActionType = { type: 'UI - toggle menu' };

export const UIReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'UI - toggle menu':
      return {
        ...state,
        sideMenuOpen: !state.sideMenuOpen,
      };

    default:
      return state;
  }
};

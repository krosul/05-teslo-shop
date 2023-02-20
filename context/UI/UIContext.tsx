import { createContext } from 'react';

export interface ContextProps {
  sideMenuOpen: boolean;
  toggleSideMenu: () => void;
}
export const UIContext = createContext({} as ContextProps);

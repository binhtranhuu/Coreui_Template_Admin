import { createContext, useContext } from 'react';
import UserStore from './userStore';
import ThemeStore from './themeStore'

export const store = {
  userStore: new UserStore(),
  themeStore: new ThemeStore()
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
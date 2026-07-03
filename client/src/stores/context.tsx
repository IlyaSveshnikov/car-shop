import { createContext, FC, ReactNode, useContext } from "react";
import { RootStore } from "./RootStore";

const StoreContext = createContext<RootStore | null>(null);

const rootStore = new RootStore();

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
);

function useRootStore(): RootStore {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useRootStore должен использоваться внутри StoreProvider");
  }
  return store;
}

export const useCarsStore = () => useRootStore().carsStore;
export const useFavoritesStore = () => useRootStore().favoritesStore;
export const useCartStore = () => useRootStore().cartStore;

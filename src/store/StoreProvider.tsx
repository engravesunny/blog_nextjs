"use client";

import { createSelectors } from "@/utils/createSelectors";
import { createContext, useContext, useRef } from "react";
import { initializeRootStore, RootState } from ".";

export type RootStoreApi = ReturnType<typeof initializeRootStore>;

const RootStoreContext = createContext<RootStoreApi | null>(null);

interface IRootStoreProviderProps {
  children: React.ReactNode;
  initState: RootState;
}
export default function RootStoreProvider({
  children,
  initState,
}: IRootStoreProviderProps) {
  const storeRef = useRef<RootStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = initializeRootStore(initState);
  }
  return (
    <RootStoreContext.Provider value={storeRef.current}>
      {children}
    </RootStoreContext.Provider>
  );
}

export const useStore = () => {
  const store = useContext(RootStoreContext);
  if (!store) {
    throw new Error("useStore must be used within a RootStoreProvider.");
  }
  return createSelectors(store).use;
};

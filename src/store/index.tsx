import { devtools } from "zustand/middleware";
import { postState, postActions } from "./post";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

export const initState = {
  postState
}

export type RootState = typeof initState;
export type RootAction = ReturnType<typeof postActions>;
export type RootStore = RootState & RootAction;

export const initializeRootStore = (initState: RootState) => create<RootStore>()(
    devtools(
      immer((set, get) => ({
        ...initState,
        ...postActions(set, get),
      }))
    )
  )
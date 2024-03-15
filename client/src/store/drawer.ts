import { create } from "zustand";

type iUseDrawerStore = {
    drawer: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
};

const useDrawerStore = create<iUseDrawerStore>(set => ({
    drawer: true,
    openDrawer: () => set({ drawer: true }),
    closeDrawer: () => set({ drawer: false }),
}));

export default useDrawerStore;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openItem: ["dashboard"],
    drawerOpen: true,
};

const menu = createSlice({
    name: "menu",
    initialState,
    reducers: {
        activeItem(state, action) {
            state.openItem = action.payload.openItem;
        },
        openDrawer(state, action) {
            state.drawerOpen = action.payload.drawerOpen;
        },
    },
});

export default menu.reducer;
export const { activeItem, openDrawer } = menu.actions;

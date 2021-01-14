import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

const initialState = { app: "all" };
export const AppReducer = createSlice({
    name: "app",
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.app = action.payload;
        },
    },
});

export const { setFilters, setSorting } = AppReducer.actions;

export const getFilters = (state) => state.app;

export default AppReducer.reducer;

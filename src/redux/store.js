import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserReducer";
import AppReducer from "./AppReducer";
export const store = configureStore({
    reducer: {
        users: UserReducer,
        app: AppReducer,
    },
});

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { calendarSlice } from "./calendar";
import { uiSlice } from "./UI";

export const store = configureStore( {
    reducer: {
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer,
        auth: authSlice.reducer
    },
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware( {
        serializableCheck: false,
    } )
} )
import { configureStore } from "@reduxjs/toolkit";
import { calendarSlice } from "./calendar";
import { uiSlice } from "./UI";

export const store = configureStore( {
    reducer: {
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer
    }
} )
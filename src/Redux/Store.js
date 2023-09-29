import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice";
import { brandsReducer } from "./brandsSlice";
import { categoriesReducer } from "./categoriesSlice";

export const store = configureStore({
    reducer:{
        counter:counterReducer,
        brands:brandsReducer,
        categories:categoriesReducer
    }
})
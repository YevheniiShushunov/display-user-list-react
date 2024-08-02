import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "../api/users-api";

export const usersStore = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(usersApi.middleware),
});

setupListeners(usersStore.dispatch);
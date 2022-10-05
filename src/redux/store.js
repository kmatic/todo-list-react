import { configureStore } from "@reduxjs/toolkit";
import projectModalReducer from './projectModal';

export const store = configureStore({
    reducer: {
        projectModal: projectModalReducer,
    },
});
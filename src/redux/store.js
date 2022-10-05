import { configureStore } from "@reduxjs/toolkit";
import projectModalReducer from './projectModal';
import todoModalReducer from './todoModal';

export const store = configureStore({
    reducer: {
        projectModal: projectModalReducer,
        todoModal: todoModalReducer,
    },
});
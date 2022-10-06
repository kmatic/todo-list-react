import { configureStore } from '@reduxjs/toolkit';
import projectModalReducer from './projectModal';
import todoModalReducer from './todoModal';
import dataReducer from './data';

export const store = configureStore({
    reducer: {
        projectModal: projectModalReducer,
        todoModal: todoModalReducer,
        data: dataReducer,
    },
});

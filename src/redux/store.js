import { configureStore } from '@reduxjs/toolkit';
import projectModalReducer from './features/projectModal';
import todoModalReducer from './features/todoModal';
import dataReducer from './features/data';
import authReducer from './features/auth';

export const store = configureStore({
    reducer: {
        projectModal: projectModalReducer,
        todoModal: todoModalReducer,
        data: dataReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({
            serializableCheck: {
                ignoredActions: ['users/getProjects/fulfilled'],
            },
        }),
});

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show: false,
}

export const todoModalSlice = createSlice({
    name: 'todoModal',
    initialState,
    reducers: {
        openTodo: (state) => {
            state.show = true;
        },
        closeTodo: (state) => {
            state.show = false;
        },
    },
});

export const { openTodo, closeTodo } = todoModalSlice.actions;

export default todoModalSlice.reducer;
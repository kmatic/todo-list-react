import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show: false,
}

export const projectModalSlice = createSlice({
    name: 'projectModal',
    initialState,
    reducers: {
        open: (state) => {
            state.show = true;
        },
        close: (state) => {
            state.show = false;
        },
    },
});

export const { open, close } = projectModalSlice.actions;

export default projectModalSlice.reducer;
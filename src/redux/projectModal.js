import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show: false,
}

export const projectModalSlice = createSlice({
    name: 'projectModal',
    initialState,
    reducers: {
        openProject: (state) => {
            state.show = true;
        },
        closeProject: (state) => {
            state.show = false;
        },
    },
});

export const { openProject, closeProject } = projectModalSlice.actions;

export default projectModalSlice.reducer;
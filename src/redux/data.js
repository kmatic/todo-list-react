import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    project: {
        id: uuidv4(),
        projectName: '',
        todos: []
    },
    todo: {
        id: uuidv4(),
        title: '',
        description: '',
        dueDate: '',
        priority: 'High'
    },
    projects: [{id: uuidv4(), projectName: 'Inbox', todos: []}]
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        handleProject: (state, action) => {
            state.project.projectName = action.payload
        },
        addProject: (state) => {
            state.projects.push(state.project);
            state.project = {
                id: uuidv4(),
                projectName: '',
                todos: []
            }
        }
    },
});

export const { handleProject, addProject } = dataSlice.actions;

export default dataSlice.reducer;
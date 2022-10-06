import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    project: {
        id: uuidv4(),
        projectName: '',
        todos: [],
        active: false,
    },
    todo: {
        id: uuidv4(),
        title: '',
        description: '',
        dueDate: '',
        priority: 'High',
    },
    projects: [{ id: uuidv4(), projectName: 'Inbox', todos: [], active: true }],
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        handleProject: (state, action) => {
            state.project.projectName = action.payload;
        },
        addProject: (state) => {
            state.projects.push(state.project);
            state.project = {
                id: uuidv4(),
                projectName: '',
                todos: [],
            };
        },
        delProject: (state, action) => {
            const newProjects = state.projects.filter(
                (project) => project.id !== action.payload,
            );
            state.projects = newProjects;
        },
        handleTodo: (state, action) => {
            const { name, value } = action.payload;
            state.todo = {
                ...state.todo,
                [name]: value,
            };
        },
        addTodo: (state, action) => {
            const { projectId, todoId } = action.payload;

            for (const project of state.projects) {
                if (project.id === projectId) {
                    project.todos.push(state.todo);
                }
            }
            state.todo = {
                id: uuidv4(),
                title: '',
                description: '',
                dueDate: '',
                priority: 'High',
            };
        },
        changeActiveProject: (state, action) => {
            for (const project of state.projects) {
                if (project.id === action.payload) {
                    project.active = true;
                } else if (project.active === true) {
                    project.active = false;
                }
            }
        },
        delTodo: (state, action) => {
            const { projectId, todoId } = action.payload;

            for (const project of state.projects) {
                if (project.id === projectId) {
                    project.todos = project.todos.filter(
                        (todo) => todo.id !== todoId,
                    );
                }
            }
        },
    },
});

export const {
    handleProject,
    addProject,
    delProject,
    handleTodo,
    addTodo,
    changeActiveProject,
    delTodo,
} = dataSlice.actions;

export default dataSlice.reducer;

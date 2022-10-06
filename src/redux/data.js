import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    project: {
        id: uuidv4(),
        projectName: '',
        todos: [],
    },
    todo: {
        id: uuidv4(),
        title: '',
        description: '',
        dueDate: '',
        priority: 'High',
    },
    projects: [{ id: uuidv4(), projectName: 'Inbox', todos: [] }],
};

initialState.activeProject = initialState.projects[0];

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
            const newActive = state.projects.find(
                (project) => project.id === action.payload,
            );

            state.activeProject = newActive;
        },
        delTodo: (state, action) => {
            const { projectId, todoId } = action.payload;

            const updatedTodos = state.activeProject.todos.filter(
                (todo) => todo.id !== todoId,
            );

            state.activeProject.todos = updatedTodos;

            for (const project of state.projects) {
                if (project.id === projectId) {
                    project.todos = updatedTodos;
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

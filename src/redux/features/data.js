import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../firebase/config';
import {
    collection,
    doc,
    getDocs,
    setDoc,
    deleteDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
} from 'firebase/firestore';

export const getProjects = createAsyncThunk(
    'users/getProjects',
    async (userID) => {
        let data = [];
        const projectsRef = collection(db, `users/${userID}/projects`);
        const querySnapshot = await getDocs(projectsRef);
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        return data;
    },
);

export const addProject = createAsyncThunk(
    'users/addProject',
    async ({ userID, project }) => {
        const projectsRef = collection(db, `users/${userID}/projects`);
        await setDoc(doc(projectsRef, project.id), project);
    },
);

export const delProjectById = createAsyncThunk(
    'users/delProject',
    async ({ userID, id }) => {
        const projectsRef = collection(db, `users/${userID}/projects`);
        await deleteDoc(doc(projectsRef, id));
    },
);

export const addTodoById = createAsyncThunk(
    'users/addTodo',
    async ({ userID, active, todo }) => {
        const todosRef = doc(db, `users/${userID}/projects/${active}`);
        await updateDoc(todosRef, {
            todos: arrayUnion(todo),
        });
    },
);

export const delTodoById = createAsyncThunk(
    'users/delTodo',
    async ({ userID, active, todo }) => {
        const todosRef = doc(db, `users/${userID}/projects/${active}`);
        await updateDoc(todosRef, {
            todos: arrayRemove(todo),
        });
    },
);

const initialState = {
    active: null,
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

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        handleProject: (state, action) => {
            state.project.projectName = action.payload;
        },
        clearProject: (state) => {
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
            let updatedProjects;
            const { projectId, todoId } = action.payload;
            const activeProject = state.projects.find(
                (project) => project.id === projectId,
            );

            if (activeProject.todos.find((todo) => todo.id === todoId)) {
                let updatedTodos = activeProject.todos.map((todo) => {
                    if (todo.id === todoId) {
                        return {
                            id: state.todo.id,
                            title: state.todo.title,
                            description: state.todo.description,
                            dueDate: state.todo.dueDate,
                            priority: state.todo.priority,
                        };
                    }
                    return todo;
                });

                updatedProjects = state.projects.map((project) => {
                    if (project.id === projectId) {
                        return { ...project, todos: updatedTodos };
                    }
                    return project;
                });
            } else {
                updatedProjects = state.projects.map((project) => {
                    if (project.id === projectId) {
                        return {
                            ...project,
                            todos: [...project.todos, state.todo],
                        };
                    }
                    return project;
                });
            }

            state.projects = updatedProjects;
            state.todo = {
                id: uuidv4(),
                title: '',
                description: '',
                dueDate: '',
                priority: 'High',
            };
        },
        changeActiveProject: (state, action) => {
            // for (const project of state.projects) {
            //     if (project.id === action.payload) {
            //         project.active = true;
            //     } else if (project.active === true) {
            //         project.active = false;
            //     }
            // }
            state.active = action.payload;
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
        editTodo: (state, action) => {
            const { projectId, todoId } = action.payload;

            const activeProject = state.projects.find(
                (project) => project.id === projectId,
            );

            const editedTodo = activeProject.todos.find(
                (todo) => todo.id === todoId,
            );

            state.todo = editedTodo;
        },
        clearTodoFields: (state) => {
            console.log('yes');
            state.todo = {
                id: uuidv4(),
                title: '',
                description: '',
                dueDate: '',
                priority: 'High',
            };
        },
    },
    extraReducers: {
        [getProjects.fulfilled]: (state, action) => {
            state.projects = action.payload;
            console.log('getProjects fulfilled');
        },
        [getProjects.pending]: (state) => {
            console.log('getProjects pending');
        },
        [getProjects.rejected]: (state) => {
            console.error('Error getting projects for firestore');
        },
        [addProject.fulfilled]: (state) => {
            console.log('project added');
        },
        [delProjectById.fulfilled]: (state) => {
            console.log('project deleted');
        },
        [addTodoById.fulfilled]: (state) => {
            console.log('todo added');
        },
        [delTodoById.fulfilled]: (state) => {
            console.log('todo deleted');
        },
    },
});

export const {
    handleProject,
    clearProject,
    delProject,
    handleTodo,
    addTodo,
    changeActiveProject,
    delTodo,
    editTodo,
    clearTodoFields,
} = dataSlice.actions;

export default dataSlice.reducer;

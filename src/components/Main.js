import React from "react";
import Nav from "./main/Nav";
import Todos from "./main/Todos";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import { ProjectModal, TodoModal } from "./modal/Modal";
import { v4 as uuidv4 } from 'uuid';

const Main = () => {
    const fields = {
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

    const [data, setData] = useState(fields);
    const [activeProject, setActiveProject] = useState(data.projects[0]);

    const handleTodo = (e) => {
        setData((prevState) => ({
            ...prevState,
            todo: {
                ...prevState.todo,
                [e.target.name]: e.target.value,
            }
        }));
    }

    const delProject = (id) => {
        const updatedProjects = data.projects.filter(project => project.id !== id);
        
        setData(prevState => ({
            ...prevState,
            projects: updatedProjects
        }))
    }

    const changeActiveProject = (id) => {
        const newActiveProject = data.projects.find(project => project.id === id);

        setActiveProject(newActiveProject);
    }

    const addTodo = (e, projectId, todoId) => {
        e.preventDefault();
        let updatedProjects;

        if (activeProject.todos.find(todo => todo.id === todoId)) {
            let updatedTodos = activeProject.todos.map(todo => {
                if (todo.id === todoId) {
                    return {
                        id: data.todo.id,
                        title: data.todo.title,
                        description: data.todo.description,
                        dueDate: data.todo.dueDate,
                        priority: data.todo.priority
                    }
                }
                return todo;
            });

            updatedProjects = data.projects.map(project => {
                if (project.id === projectId) {
                    return {...project, todos: updatedTodos};
                }
                return project;
            });
        } else {
            updatedProjects = data.projects.map(project => {
                if (project.id === projectId) {
                    return {...project, todos: [...project.todos, data.todo]};
                }
                return project;
            });
        }

        setData((prevState) => ({
            ...prevState,
            todo: {
                id: uuidv4(),
                title: '',
                description: '',
                dueDate: '',
                priority: 'High'
            },
            projects: updatedProjects
        }))

        // setShowTodoModal(false);
    }

    const delTodo = (e, todoId, projectId) => {
        e.stopPropagation();

        const updatedTodos = activeProject.todos.filter(todo => todo.id !== todoId);
        const updatedProjects = data.projects.map(project => {
            if (project.id === projectId) {
                return {...project, todos: updatedTodos};
            }
            return project;
        });

        setData(prevState => ({
            ...prevState,
            projects: updatedProjects
        })) 
    }

    const editTodo = (e, todoId) => {
        e.stopPropagation();

        const editedTodo = activeProject.todos.find(todo => todo.id === todoId);

        setData(prevState => ({
            ...prevState,
            todo: {
                id: editedTodo.id,
                title: editedTodo.title,
                description: editedTodo.description,
                dueDate: editedTodo.dueDate,
                priority: editedTodo.priority
            }
        }));

        // setShowTodoModal(true);
    }

    const closeEditModal = () => {
        setData(prevState => ({
            ...prevState,
            todo: {
                id: uuidv4(),
                title: '',
                description: '',
                dueDate: '',
                priority: 'High'
            }
        }));
        
        // setShowTodoModal(false);
    }

    useEffect(() => {
        changeActiveProject(activeProject.id);
    })

    return (
        <>
            <MainWrapper>
                <Nav
                    delProject={delProject}
                    changeActiveProject={changeActiveProject}
                />
                <Todos
                    activeProject={activeProject}
                    delTodo={delTodo}
                    editTodo={editTodo}
                />
            </MainWrapper>
            <ProjectModal
                project={data.project}
            />
            <TodoModal
                onClose={closeEditModal}
                todo={data.todo}
                handleTodo={handleTodo}
                activeProject={activeProject}
                onSubmit={addTodo}
            />
        </>
    );
}

const MainWrapper = styled.main`
    display: grid;
    grid-template-columns: 300px 1fr;
`;

export default Main;
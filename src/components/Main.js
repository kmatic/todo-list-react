import React from "react";
import Nav from "./main/Nav";
import Todos from "./main/Todos";
import styled from "styled-components";
import { useState } from 'react';
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
            priority: ''
        },
        projects: [{id: uuidv4(), projectName: 'Inbox', todos: []}]
    };

    const [data, setData] = useState(fields);
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [showTodoModal, setShowTodoModal] = useState(false);
    const [activeProject, setActiveProject] = useState(data.projects[0]);

    const handleProject = (e) => {
        setData((prevState) => ({
            ...prevState,
            project: {
                ...prevState.project,
                [e.target.name]: e.target.value,
            },
        }));
    }

    const handleTodo = (e) => {
        setData((prevState) => ({
            ...prevState,
            todo: {
                ...prevState.todo,
                [e.target.name]: e.target.value,
            }
        }));
    }

    const addProject = (e) => {
        e.preventDefault();
        setData((prevState) => ({
            ...prevState,
            project: {
                id: uuidv4(),
                projectName: '',
                todos: []
            },
            projects: [...prevState.projects, prevState.project]
        }));

        setShowProjectModal(false);
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

    return (
        <>
            <MainWrapper>
                <Nav
                    projects={data.projects}
                    onClick={() => setShowProjectModal(true)}
                    delProject={delProject}
                    changeActiveProject={changeActiveProject}
                />
                <Todos
                    onClick={() => setShowTodoModal(true)}
                    activeProject={activeProject}
                />
            </MainWrapper>
            <ProjectModal
                show={showProjectModal}
                onClose={() => setShowProjectModal(false)}
                project={data.project}
                handleProject={handleProject}
                onSubmit={addProject}
            />
            <TodoModal
                show={showTodoModal}
                onClose={() => setShowTodoModal(false)}
                todo={data.todo}
                handleTodo={handleTodo}
            />
        </>
    );
}

const MainWrapper = styled.main`
    display: grid;
    grid-template-columns: 300px 1fr;
`;

export default Main;
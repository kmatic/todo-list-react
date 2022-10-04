import React from "react";
import Nav from "./main/Nav";
import styled from "styled-components";
import { useState } from 'react';
import ProjectModal from "./modal/Modal";
import { v4 as uuidv4 } from 'uuid';

const Main = () => {
    const fields = {
        project: {
            id: uuidv4(),
            projectName: '',
            todos: []
        },
        projects: [
            {id: uuidv4, projectName: 'gym', todos: []}
        ]
    };

    const [data, setData] = useState(fields);
    const [showProjectModal, setShowProjectModal] = useState(false);

    const handleProject = (e) => {
        setData((prevState) => ({
            ...prevState,
            project: {
                ...prevState.project,
                [e.target.name]: e.target.value,
            },
        }));
    }

    const addProject = (e) => {
        e.preventDefault();
        setData((prevState) => ({
            project: {
                id: uuidv4(),
                projectName: '',
                todos: []
            },
            projects: [...prevState.projects, prevState.project]
        }));

        setShowProjectModal(false);
        console.log(data);
    }

    return (
        <>
            <MainWrapper>
                <Nav
                    projects={data.projects}
                    onClick={() => setShowProjectModal(true)}
                />
            </MainWrapper>
            <ProjectModal
                show={showProjectModal}
                onClose={() => setShowProjectModal(false)}
                project={data.project}
                handleProject={handleProject}
                onSubmit={addProject}
            />
        </>
    );
}

const MainWrapper = styled.main`
    display: grid;
    grid-template-columns: 300px 1fr;
`;

export default Main;
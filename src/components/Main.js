import React from "react";
import Nav from "./main/Nav";
import styled from "styled-components";
import { useState } from 'react';
import ProjectModal from "./modal/Modal";

const Main = () => {
    const data = [
        {
          name: 'Gym'
        },
        {
          name: 'Work'
        }
    ];

    const [projects, setProjects] = useState(data);
    const [showProjectModal, setShowProjectModal] = useState(false);

    return (
        <>
            <MainWrapper>
                <Nav
                    projects={projects}
                    onClick={() => setShowProjectModal(true)}
                />
            </MainWrapper>
            <ProjectModal
                show={showProjectModal}
                onClose={() => setShowProjectModal(false)}
            />
        </>
    );
}

const MainWrapper = styled.main`
    display: grid;
    grid-template-columns: 300px 1fr;
`;

export default Main;
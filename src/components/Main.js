import React from 'react';
import Nav from './main/Nav';
import Todos from './main/Todos';
import styled from 'styled-components';
import { ProjectModal, TodoModal } from './modal/Modal';

const Main = () => {
    return (
        <>
            <MainWrapper>
                <Nav />
                <Todos />
            </MainWrapper>
            <ProjectModal />
            <TodoModal />
        </>
    );
};

const MainWrapper = styled.main`
    display: grid;
    grid-template-columns: 300px 1fr;
`;

export default Main;

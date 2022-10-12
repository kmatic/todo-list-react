import React from 'react';
import Nav from './main/Nav';
import Todos from './main/Todos';
import styled from 'styled-components';

const Main = () => {
    return (
        <>
            <MainWrapper>
                <Nav />
                <Todos />
            </MainWrapper>
        </>
    );
};

const MainWrapper = styled.main`
    display: grid;
    grid-template-columns: 300px 1fr;
`;

export default Main;

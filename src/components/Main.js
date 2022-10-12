import React from 'react';
import Nav from './main/Nav';
import Todos from './main/Todos';
import styled from 'styled-components';
import { getProjects } from '../redux/features/data';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Main = () => {
    const dispatch = useDispatch();
    const { userID } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getProjects(userID));
    }, [dispatch, userID]);

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

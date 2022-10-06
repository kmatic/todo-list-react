import React from 'react';
import Nav from './main/Nav';
import Todos from './main/Todos';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { ProjectModal, TodoModal } from './modal/Modal';
import { v4 as uuidv4 } from 'uuid';

const Main = () => {
    const fields = {
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

    const [data, setData] = useState(fields);

    const closeEditModal = () => {
        setData((prevState) => ({
            ...prevState,
            todo: {
                id: uuidv4(),
                title: '',
                description: '',
                dueDate: '',
                priority: 'High',
            },
        }));

        // setShowTodoModal(false);
    };

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

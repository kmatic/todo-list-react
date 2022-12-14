import React from 'react';
import styled from 'styled-components';
import { TodoModal } from '../modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Todo from './Todo';
import { useDispatch, useSelector } from 'react-redux';
import { openTodo } from '../../redux/features/todoModal';

const Todos = () => {
    const dispatch = useDispatch();
    const { show } = useSelector((state) => state.todoModal);
    const { projects, active } = useSelector((state) => state.data);
    const activeProject = projects.find((project) => project.id === active);

    if (!activeProject) {
        return null;
    }

    return (
        <>
            {show && <TodoModal />}
            <TodosWrapper>
                <h1>{activeProject.projectName}</h1>
                <div>
                    {activeProject.todos.map((todo) => (
                        <Todo
                            key={todo.id}
                            todo={todo}
                            activeProject={activeProject}
                        />
                    ))}
                </div>
                <Button onClick={() => dispatch(openTodo())}>
                    <FontAwesomeIcon icon={faPlus} /> Add Task
                </Button>
            </TodosWrapper>
        </>
    );
};

const TodosWrapper = styled.div`
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    width: 75%;
    justify-self: center;

    > h1 {
        padding-bottom: 10px;
    }
`;

const Button = styled.button`
    text-align: left;
    margin-top: 10px;
    background-color: transparent;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    font-size: 1.1rem;

    :hover {
        background-color: lightgray;
    }
`;

export default Todos;

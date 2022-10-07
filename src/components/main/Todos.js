import React from 'react';
import styled from 'styled-components';
import { TodoModal } from '../modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Todo from './Todo';
import { useDispatch, useSelector } from 'react-redux';
import { openTodo } from '../../redux/todoModal';

const Todos = () => {
    const { show } = useSelector((state) => state.todoModal);
    const { projects } = useSelector((state) => state.data);
    const dispatch = useDispatch();

    const activeProject = projects.find((project) => project.active === true);

    if (!activeProject) {
        return null;
    }

    return (
        <>
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
            {show && <TodoModal />}
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

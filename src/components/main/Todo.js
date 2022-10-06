import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { delTodo, editTodo } from '../../redux/data';
import { useDispatch } from 'react-redux';
import { openTodo } from '../../redux/todoModal';

const Todo = ({ todo, activeProject }) => {
    const [showDetails, setShowDetails] = useState(false);
    const dispatch = useDispatch();

    const dispatchEdit = (e, projectId, todoId) => {
        e.stopPropagation();

        const payload = {
            projectId,
            todoId,
        };

        dispatch(editTodo(payload));
        dispatch(openTodo());
    };

    return (
        <>
            <TodoWrapper onClick={() => setShowDetails(!showDetails)}>
                <div>
                    <input
                        type="checkbox"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <p>{todo.title}</p>
                </div>
                <div>
                    <p>{todo.dueDate}</p>
                    <Icon
                        icon={faPen}
                        onClick={(e) =>
                            dispatchEdit(e, activeProject.id, todo.id)
                        }
                    />
                    <Icon
                        icon={faTrashCan}
                        onClick={() =>
                            dispatch(
                                delTodo({
                                    projectId: activeProject.id,
                                    todoId: todo.id,
                                }),
                            )
                        }
                    />
                </div>
            </TodoWrapper>
            {showDetails && (
                <DetailsWrapper>
                    <p>
                        <span>Title:</span> {todo.title}
                    </p>
                    <p>
                        <span>Due date:</span> {todo.dueDate}
                    </p>
                    <p>
                        <span>Priority:</span> {todo.priority}
                    </p>
                    <p>
                        <span>Description:</span> {todo.description}
                    </p>
                </DetailsWrapper>
            )}
        </>
    );
};

const TodoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
    padding: 10px 5px;
    cursor: pointer;

    > div {
        display: flex;
        gap: 8px;
    }

    input {
        cursor: pointer;
    }
`;

const Icon = styled(FontAwesomeIcon)`
    border-radius: 5px;
    padding: 3px;

    :hover {
        background-color: lightgray;
    }
`;

const DetailsWrapper = styled.div`
    font-size: 0.9rem;
    border-radius: 5px;
    border: 1px solid lightgray;
    padding: 12px;
    margin: 8px 0px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;

    > p > span {
        font-weight: 700;
    }
`;

export default Todo;

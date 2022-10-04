import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ todo, delTodo, activeProject, editTodo }) => {
    return (
        <TodoWrapper>
            <div>
                <input type='checkbox' />
                <p>{todo.title}</p>
            </div>
            <div>
                <p>{todo.dueDate}</p>
                <FontAwesomeIcon icon={faPen} onClick={() => editTodo(todo.id)}/>
                <FontAwesomeIcon icon={faTrashCan} onClick={() => delTodo(todo.id, activeProject.id)} />
            </div>
        </TodoWrapper>
    );
}

const TodoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
    padding: 10px 0px;
    cursor: pointer;

    > div {
        display: flex;
        gap: 10px;
        align-items: center;
    }

    input {
        cursor: pointer;
    }
`;

export default Todo;
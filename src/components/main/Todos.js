import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Todo from "./Todo";

const Todos = ({ onClick, activeProject, delTodo, editTodo }) => {
    return (
        <TodosWrapper>
            <h1>{activeProject.projectName}</h1>
            <div>
                {activeProject.todos.map(todo => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        delTodo={delTodo}
                        activeProject={activeProject}
                        editTodo={editTodo}
                    />
                ))}
            </div>
            <Button onClick={() => onClick()}><FontAwesomeIcon icon={faPlus} /> Add Task</Button>
        </TodosWrapper>
    );
}

const TodosWrapper = styled.div`
    padding: 30px 40px;
    display: flex;
    flex-direction: column;
    max-width: 80%;
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
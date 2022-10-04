import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Todos = ({ onClick }) => {
    return (
        <TodosWrapper>
            <h1>Inbox</h1>
            <div>

            </div>
            <Button onClick={() => onClick()}><FontAwesomeIcon icon={faPlus} /> Add Task</Button>
        </TodosWrapper>
    );
}

const TodosWrapper = styled.div`
    padding: 30px 40px;
    display: flex;
    flex-direction: column;
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
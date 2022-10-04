import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Header = () => {
    return (
        <HeaderWrapper>
            <Icon icon={faListCheck} />
            <h1>Todo List</h1>
        </HeaderWrapper>
    );
}

const HeaderWrapper = styled.header`
    display: flex;
    gap: 15px;
    background-color: var(--dark-color);
    color: var(--light-color);
    align-items: center;
    font-size: 1.5rem;
    padding: 15px 25px;
`;

const Icon = styled(FontAwesomeIcon)`
    font-size: 2.9rem;
`;

export default Header;
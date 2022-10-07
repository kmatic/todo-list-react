import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

const Header = () => {
    const { displayName, isLogged } = useSelector((state) => state.auth);

    const signOutUser = () => {
        signOut(auth);
    };

    return (
        <HeaderWrapper>
            <div>
                <Icon icon={faListCheck} />
                <h1>Todo List</h1>
            </div>
            {isLogged && displayName && (
                <>
                    <div>
                        <div>
                            <p>Hi {displayName}</p>
                        </div>
                        <Button type="submit" onClick={() => signOutUser()}>
                            Logout
                        </Button>
                    </div>
                </>
            )}
        </HeaderWrapper>
    );
};

const HeaderWrapper = styled.header`
    display: flex;
    justify-content: space-between;
    background-color: var(--dark-color);
    color: var(--light-color);
    align-items: center;
    font-size: 1.5rem;
    padding: 15px 25px;

    > div {
        display: flex;
        gap: 15px;
        align-items: center;
    }
`;

const Icon = styled(FontAwesomeIcon)`
    font-size: 2.9rem;
`;

const Button = styled.button`
    background-color: #db4437;
    border-radius: 5px;
    font-size: 1rem;
    padding: 3px 10px;
`;

export default Header;

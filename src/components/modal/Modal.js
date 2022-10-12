import React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { closeProject } from '../../redux/features/projectModal';
import { closeTodo } from '../../redux/features/todoModal';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { setActiveUser } from '../../redux/features/auth';
import {
    handleProject,
    clearProject,
    handleTodo,
    clearTodoFields,
    changeActiveProject,
    addProject,
    addTodoById,
} from '../../redux/features/data';

export const ProjectModal = () => {
    const { project } = useSelector((state) => state.data);
    const { userID } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const onSubmit = (e, project) => {
        e.preventDefault();
        dispatch(addProject({ userID, project }));
        dispatch(clearProject());
        dispatch(closeProject());
        dispatch(changeActiveProject(project.id));
    };

    return ReactDOM.createPortal(
        <ModalWrapper onClick={() => dispatch(closeProject())}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <Header>
                    <h2>New Project</h2>
                    <span onClick={() => dispatch(closeProject())}>
                        &times;
                    </span>
                </Header>
                <form onSubmit={(e) => onSubmit(e, project)}>
                    <div>
                        <label htmlFor="projectName">Name: *</label>
                        <input
                            type="text"
                            name="projectName"
                            onChange={(e) =>
                                dispatch(handleProject(e.target.value))
                            }
                            value={project.projectName}
                            required
                        />
                    </div>
                    <div>
                        <ModalButton>Add Project</ModalButton>
                    </div>
                </form>
            </ModalContainer>
        </ModalWrapper>,
        document.getElementById('modal'),
    );
};

export const TodoModal = () => {
    const { todo, active } = useSelector((state) => state.data);
    const { userID } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const onChange = (e) => {
        const payload = {
            name: e.target.name,
            value: e.target.value,
        };
        dispatch(handleTodo(payload));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        addTodoById();
        dispatch(addTodoById({ userID, active, todo }));
        dispatch(closeTodo());
        dispatch(clearTodoFields());
    };

    const onClose = () => {
        dispatch(closeTodo());
        dispatch(clearTodoFields());
    };

    return ReactDOM.createPortal(
        <ModalWrapper onClick={() => onClose()}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <Header>
                    <h2>New Todo</h2>
                    <span onClick={() => onClose()}>&times;</span>
                </Header>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div>
                        <label htmlFor="title">Title: *</label>
                        <input
                            type="text"
                            name="title"
                            value={todo.title}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            name="description"
                            cols="30"
                            rows="10"
                            value={todo.description}
                            onChange={(e) => onChange(e)}></textarea>
                    </div>
                    <div>
                        <label htmlFor="dueDate">Due Date: *</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={todo.dueDate}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="priority">Priority:</label>
                        <select
                            name="priority"
                            value={todo.priority}
                            onChange={(e) => onChange(e)}>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div>
                        <ModalButton>Submit Todo</ModalButton>
                    </div>
                </form>
            </ModalContainer>
        </ModalWrapper>,
        document.getElementById('modal'),
    );
};

export const Login = () => {
    const dispatch = useDispatch();
    const provider = new GoogleAuthProvider();

    const googleSignIn = (e) => {
        e.preventDefault();

        signInWithPopup(auth, provider)
            .then((result) => {
                const data = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    userID: result.user.uid,
                };
                dispatch(setActiveUser(data));
            })
            .catch((error) => {
                // Handle Errors here.
                throw new Error(error.message);
            });
    };

    return ReactDOM.createPortal(
        <ModalWrapper>
            <ModalContainer>
                <Header>
                    <h2>Get Started</h2>
                </Header>
                <form onSubmit={(e) => googleSignIn(e)}>
                    <div>
                        <p>Sign in to create todos and manage your tasks</p>
                        <ModalButton google>Continue with Google</ModalButton>
                    </div>
                </form>
            </ModalContainer>
        </ModalWrapper>,
        document.getElementById('modal'),
    );
};

const ModalWrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transform: scale(1.1);
    transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;

    input,
    textarea,
    select {
        padding: 8px;
        border: 1px solid lightgray;
        border-radius: 4px;
        resize: none;
    }

    input:invalid {
        border-color: rgb(196, 12, 12);
    }
`;

const ModalContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: 500px;
    border-radius: 0.5rem;

    > form {
        padding: 0px 15px 15px 15px;
    }

    > form > div {
        display: flex;
        flex-direction: column;
        padding-top: 15px;
        gap: 10px;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid lightgray;

    > span {
        font-size: 1.5rem;
        color: grey;
        cursor: pointer;
        font-weight: bolder;
    }

    > span:hover {
        filter: brightness(20%);
    }
`;

const ModalButton = styled.button`
    padding: 8px;
    background-color: ${(props) => (props.google ? '#DB4437' : 'green')};
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.2rem;
`;

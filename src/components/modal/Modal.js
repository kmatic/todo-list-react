import styled from "styled-components";

export const ProjectModal = ({show, onClose, handleProject, project, onSubmit}) => {
    if (!show) {
        return null;
    }

    return (
        <ModalWrapper onClick={() => onClose()}>
            <ModalContainer onClick={e => e.stopPropagation()}>
                <Header>
                    <h2>New Project</h2>
                    <span onClick={() => onClose()}>&times;</span>
                </Header>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div>
                        <label htmlFor='projectName'>Name: *</label>
                        <input
                            type='text'
                            name='projectName'
                            onChange={(e) => handleProject(e)}
                            value={project.projectName}
                            required
                        />
                    </div>
                    <div>
                        <ModalButton>Add Project</ModalButton>
                    </div>
                </form>
            </ModalContainer>
        </ModalWrapper>
    );
}

export const TodoModal = ({ show, onClose }) => {
    if (!show) {
        return null;
    }

    return (
        <ModalWrapper onClick={() => onClose()}>
            <ModalContainer onClick={e => e.stopPropagation()}>
                <Header>
                    <h2>New Todo</h2>
                    <span onClick={() => onClose()}>&times;</span>
                </Header>
                <form>
                    <div>
                        <label htmlFor='title'>Title: *</label>
                        <input type='text' name='title' required />
                    </div>
                    <div>
                        <label htmlFor='description'>Description:</label>
                        <textarea name='description' cols='30' rows='10'></textarea>
                    </div>
                    <div>
                        <label htmlFor='dueDate'>Due Date: *</label>
                        <input type='date' name='dueDate' required />
                    </div>
                    <div>
                        <label htmlFor='priority'>Priority:</label>
                        <select name='priority'>
                            <option value='1'>High</option>
                            <option value='2'>Medium</option>
                            <option value='3'>Low</option>
                        </select>
                    </div>
                    <div>
                        <ModalButton>Submit Todo</ModalButton>
                    </div>
                </form>
            </ModalContainer>
        </ModalWrapper>
    );
}

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
    background-color: green;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.2rem;
`;
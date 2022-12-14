import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { ProjectModal } from '../modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { openProject } from '../../redux/features/projectModal';
import { changeActiveProject, delProjectById } from '../../redux/features/data';
import {
    faPlus,
    faTrashCan,
    faFolderClosed,
} from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
    const { projects } = useSelector((state) => state.data);
    const { show } = useSelector((state) => state.projectModal);
    const dispatch = useDispatch();

    return (
        <>
            {show && <ProjectModal />}
            <NavWrapper>
                {/* <ProjectsWrapper>
                    {projects.slice(0, 1).map((project) => (
                        <DefaultItemWrapper
                            key={project.id}
                            onClick={() =>
                                dispatch(changeActiveProject(project.id))
                            }>
                            <FontAwesomeIcon icon={faInbox} />
                            {project.projectName}
                        </DefaultItemWrapper>
                    ))}
                </ProjectsWrapper> */}
                <h1>Projects</h1>
                <ProjectsWrapper>
                    {projects.map((project) => (
                        <ProjectItem key={project.id} project={project} />
                    ))}
                </ProjectsWrapper>
                <Button onClick={() => dispatch(openProject())}>
                    <FontAwesomeIcon icon={faPlus} /> Add Project
                </Button>
            </NavWrapper>
        </>
    );
};

const ProjectItem = ({ project }) => {
    const dispatch = useDispatch();
    const { userID } = useSelector((state) => state.auth);

    const dispatchDelete = (e, id) => {
        e.stopPropagation();
        dispatch(delProjectById({ userID, id }));
    };

    return (
        <ProjectItemWrapper
            onClick={() => dispatch(changeActiveProject(project.id))}>
            <div>
                <FontAwesomeIcon icon={faFolderClosed} />
                <p>{project.projectName}</p>
            </div>
            <FontAwesomeIcon
                icon={faTrashCan}
                className="project-delete-btn"
                onClick={(e) => dispatchDelete(e, project.id)}
            />
        </ProjectItemWrapper>
    );
};

const NavWrapper = styled.nav`
    background-color: var(--light-color);
    padding: 20px 30px 30px 30px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    border-right: 1px solid lightgray;
`;

const ProjectsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const ProjectItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 5px;
    align-items: center;
    font-size: 1.1rem;

    > div {
        display: flex;
        gap: 15px;
        align-items: center;
    }

    :hover {
        background-color: lightgray;
        cursor: pointer;
    }

    >.project-delete-btn {
        visibility: hidden;
    }

    :hover>.project-delete-btn {
        visibility: visible;
    }
    }
`;

const DefaultItemWrapper = styled(ProjectItemWrapper)`
    justify-content: left;
    gap: 15px;
`;

const Button = styled.button`
    background-color: transparent;
    border: 0px;
    margin-top: -15px;
    padding: 10px;
    border-radius: 5px;
    text-align: left;
    font-size: 1.1rem;

    :hover {
        background-color: lightgray;
    }
`;

export default Nav;

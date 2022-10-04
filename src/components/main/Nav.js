import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faPlus, faCalendarDays, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Nav = ({ projects, onClick, delProject, changeActiveProject }) => {
    return (
        <NavWrapper>
            <ProjectsWrapper>
                {projects.slice(0, 1).map(project => (
                    <DefaultItemWrapper key={project.id} onClick={() => changeActiveProject(project.id)}>
                        <FontAwesomeIcon icon={faInbox} />
                        {project.projectName}
                    </DefaultItemWrapper>
                ))}
            </ProjectsWrapper>
            <h1>Projects</h1>
            <ProjectsWrapper>
                {projects.slice(1).map(project => (
                    <ProjectItem
                        key={project.id}
                        project={project}
                        delProject={delProject}
                        changeActiveProject={changeActiveProject}
                    />
                ))}
            </ProjectsWrapper>
            <Button onClick={() => onClick()}><FontAwesomeIcon icon={faPlus} /> Add Project</Button>
        </NavWrapper>
    );
}

const ProjectItem = ({ project, delProject, changeActiveProject }) => {
    return (
        <ProjectItemWrapper onClick={() => changeActiveProject(project.id)}>
            <div>
                <FontAwesomeIcon icon={faCalendarDays} />
                <p>{project.projectName}</p>
            </div>
            <FontAwesomeIcon
                icon={faTrashCan}
                className='project-delete-btn'
                onClick={() => delProject(project.id)}
            />
        </ProjectItemWrapper>
    );
}

const NavWrapper = styled.nav`
    background-color: var(--light-color);
    padding: 20px 30px 30px 30px;
    display: flex;
    flex-direction: column;
    gap: 25px;
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
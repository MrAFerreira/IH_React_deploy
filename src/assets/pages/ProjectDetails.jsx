// src/pages/ProjectDetailsPage.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddTask from "../components/AddTask";

const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";

function ProjectDetails(props) {
  const [project, setProject] = useState(null);

  const { projectId } = useParams();

  const getSingleProject = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/projects/${projectId}?_embed=tasks`
      );
      console.log(response);
      setProject(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProject();
  }, []);

  return (
    <div className="ProjectDetailsPage">
      {project && (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </>
      )}

      <AddTask
        getSingleProject={getSingleProject}
        projectId={projectId}
      />

      {project &&
        project.tasks.map(task => (
          <li
            className="TaskCard card"
            key={task.id}
          >
            <h3>{task.title}</h3>
            <h4>Description:</h4>
            <p>{task.description}</p>
          </li>
        ))}

      {project && (
        <Link to={`/projects/edit/${project.id}`}>
          <button>Edit Project</button>
        </Link>
      )}
      <Link to="/projects">
        <button>Back to projects</button>
      </Link>
    </div>
  );
}

export default ProjectDetails;

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";

function ProjectList() {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/projects?_embed=tasks_`
      );
      console.log(response.data);
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="ProjectListPage">
      {projects.map(project => {
        return (
          <div
            className="ProjectCard card"
            key={project._id}
          >
            <Link to={`/projects/${project.id}`}>
              <h3>{project.title}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ProjectList;

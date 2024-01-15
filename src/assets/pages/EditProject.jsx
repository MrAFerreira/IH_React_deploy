import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";

function EditProject(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { projectId } = useParams();

  const getSingleProject = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/projects/${projectId}?_embed=tasks`
      );
      setTitle(response.data.title);
      setDescription(response.data.description);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProject();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      const requestBody = { title, description };
      await axios.put(`${API_URL}/projects/${projectId}`, requestBody);
      navigate(`/projects/${projectId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async () => {
    try {
      await axios.delete(`${API_URL}/projects/${projectId}`);
      navigate("/projects");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>
      <button onClick={deleteProject}>delete Project</button>
    </div>
  );
}

export default EditProject;

import { useState } from "react";
import axios from "axios";

const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";

function AddTask({ projectId, getSingleProject }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      projectId = Number(projectId);
      const requestBody = { title, description, projectId };
      console.log("req body", requestBody);
      const response = await axios.post(`${API_URL}/tasks`, requestBody);
      console.log(response);
      setTitle("");
      setDescription("");
      await getSingleProject();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="AddTask">
      <h3>Add New Task</h3>

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
          type="text"
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;

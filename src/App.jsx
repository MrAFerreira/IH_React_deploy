import { useState } from "react";
import Navbar from "./assets/components/Navbar";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./assets/pages/Home";
import ProjectList from "./assets/pages/ProjectList";
import CreateProject from "./assets/pages/CreateProject";
import ProjectDetails from "./assets/pages/ProjectDetails";
import EditProject from "./assets/pages/EditProject";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/projects"
          element={<ProjectList />}
        />
        <Route
          path="/projects/create"
          element={<CreateProject />}
        />
        <Route
          path="/projects/:projectId"
          element={<ProjectDetails />}
        />
        <Route
          path="/projects/edit/:projectId"
          element={<EditProject />}
        />
      </Routes>
    </div>
  );
}

export default App;

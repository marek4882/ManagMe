import React, { useState, useEffect } from "react";
import { LocalRepository } from "../api/ApiService";
import { Project } from "../models/Project";
import { ProjectManager } from "../services/ProjectService";
import { useNavigate } from "react-router-dom";

const ProjectForm: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [editProjectId, setEditProjectId] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    refreshProjectList();
  }, []);

  const projectManager = new ProjectManager(new LocalRepository());

  const handleAddOrUpdateProject = (event: React.FormEvent) => {
    event.preventDefault();

    if (projectName && projectDescription) {
      if (editProjectId) {
        projectManager.updateProject(
          editProjectId,
          projectName,
          projectDescription
        );
      } else {
        projectManager.addProject(projectName, projectDescription);
      }
      setProjectName("");
      setProjectDescription("");
      setEditProjectId(null);
      refreshProjectList();
    }
  };

  const refreshProjectList = () => {
    const projects = projectManager.readProjects();
    setProjects(projects);
  };

  const handleEditProject = (id: string) => {
    const project = projects.find((project) => project.id === id);
    if (project) {
      setProjectName(project.name);
      setProjectDescription(project.description);
      setEditProjectId(project.id);
    }
  };

  const handleDeleteProject = (id: string) => {
    const deleted = projectManager.deleteProject(id);
    if (deleted) {
      refreshProjectList();
    } else {
      alert("Nie można usunąć projektu - projekt o podanym ID nie istnieje.");
    }
  };

  const handleOpenProject = (id: string) => {
    projectManager.setCurrentProject(id);
    navigate(`/project/${id}/story`);
  };

  return (
    <>
      <button className="btn" onClick={() => navigate(-1)}>
        Back
      </button>
      <section className="block grid container">
        <section className="form-container">
          <form className="form-signin" onSubmit={handleAddOrUpdateProject}>
            <h1>{editProjectId ? "Edit Project" : "Add Project"}</h1>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="projectName"
                placeholder="Project name"
                maxLength={255}
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                name="projectDescription"
                placeholder="Description"
                maxLength={255}
                required
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>
            <button className="btn btn--accent btn--form" type="submit">
              {editProjectId ? "Save Changes" : "+ Add"}
            </button>
          </form>
        </section>
        <div id="projectList">
          <div className="flex">
            <p className="flex--heading">Project</p>
            <p className="flex--heading">Description</p>
          </div>
          {projects.map((project) => (
            <div key={project.id} className="flex">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <button
                className="btn btn--edit"
                onClick={() => handleEditProject(project.id)}
              >
                Edit
              </button>
              <button
                className="btn btn--delete"
                onClick={() => handleDeleteProject(project.id)}
              >
                Delete
              </button>
              <button
                className="btn btn--open"
                onClick={() => handleOpenProject(project.id)}
              >
                Open
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProjectForm;

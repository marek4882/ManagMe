import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Project } from "../models/Project";
import { ProjectManager } from "../services/ProjectService";
import { LocalRepository } from "../api/ApiService";

const ProjectForm: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  useEffect(() => {
    refreshProjectList();
  }, []);

  const projectManager = new ProjectManager(new LocalRepository());

  const handleAddProject = (event: React.FormEvent) => {
    event.preventDefault();

    if (projectName && projectDescription) {
      projectManager.add(projectName, projectDescription);
      setProjectName("");
      setProjectDescription("");
      refreshProjectList();
    }
  };

  const refreshProjectList = () => {
    const projects = projectManager.read();
    setProjects(projects);
  };

  const handleEditProject = (id: string) => {
    const newName = prompt("Nowa nazwa projektu:");
    const newDescription = prompt("Nowy opis projektu:");

    if (newName !== null && newDescription !== null) {
      const updated = projectManager.update(id, newName, newDescription);
      if (updated) {
        refreshProjectList();
      } else {
        alert(
          "Nie można zaktualizować projektu - projekt o podanym ID nie istnieje."
        );
      }
    }
  };

  const handleDeleteProject = (id: string) => {
    const deleted = projectManager.delete(id);
    if (deleted) {
      refreshProjectList();
    } else {
      alert("Nie można usunąć projektu - projekt o podanym ID nie istnieje.");
    }
  };

  return (
    <>
      <section className="form-container">
        <form className="form-signin" onSubmit={handleAddProject}>
          <h1>Dodaj Projekt</h1>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="projectName"
              placeholder="Nazwa Projektu"
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
              placeholder="Opis Projektu"
              maxLength={255}
              required
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </div>
          <button className="btn btn--accent btn--form" type="submit">
            Dodaj
          </button>
        </form>
      </section>

      <div id="projectList">
        {projects.map((project) => (
          <div key={project.id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <button
              className="edit-btn"
              onClick={() => handleEditProject(project.id)}
            >
              Edytuj
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDeleteProject(project.id)}
            >
              Usuń
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectForm;

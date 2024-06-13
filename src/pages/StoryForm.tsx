import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectManager } from "../services/ProjectService";
import { LocalRepository } from "../api/ApiService";
import { UserService } from "../services/UserService";
import { Story } from "../models/Story";

const StoryForm: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [stories, setStories] = useState<Story[]>([]);
  const [storyName, setStoryName] = useState("");
  const [storyDescription, setStoryDescription] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Low");
  const [status, setStatus] = useState<"Todo" | "Doing" | "Done">("Todo");
  const [editStoryId, setEditStoryId] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string>("");

  const navigate = useNavigate();
  const projectManager = new ProjectManager(new LocalRepository());
  const currentUser = UserService.getCurrentUser();

  useEffect(() => {
    if (projectId) {
      projectManager.setCurrentProject(projectId);
      refreshStoryList();
      const name = projectManager.getProjectName(projectId);
      setProjectName(name);
    }
  }, [projectId]);

  const handleAddOrUpdateStory = (event: React.FormEvent) => {
    event.preventDefault();

    if (storyName && storyDescription && priority && status) {
      if (editStoryId) {
        const updated = projectManager.updateStory(
          editStoryId,
          storyName,
          storyDescription,
          priority,
          status
        );
        console.log("Story updated: ", updated);
      } else {
        projectManager.addStory(
          storyName,
          storyDescription,
          priority,
          status,
          currentUser?.id || ""
        );
      }
      setStoryName("");
      setStoryDescription("");
      setPriority("Low");
      setStatus("Todo");
      setEditStoryId(null);
      refreshStoryList();
    }
  };

  const refreshStoryList = () => {
    const stories = projectManager.readStories();
    setStories(stories);
    console.log("Stories refreshed: ", stories);
  };

  const handleEditStory = (id: string) => {
    const story = stories.find((story) => story.id === id);
    if (story) {
      setStoryName(story.name);
      setStoryDescription(story.description);
      setPriority(story.priority);
      setStatus(story.status);
      setEditStoryId(story.id);
    }
  };

  const handleDeleteStory = (id: string) => {
    const deleted = projectManager.deleteStory(id);
    if (deleted) {
      refreshStoryList();
    } else {
      alert("Unable to delete story - story with the given ID does not exist.");
    }
  };

  const handleOpenStory = (id: string) => {
    projectManager.setCurrentStory(id);
    navigate(`/story/${id}/task`);
  };

  const renderStory = (story: Story) => (
    <div key={story.id} className="kanban-item">
      <h3>Name: {story.name}</h3>
      <p>Description: {story.description}</p>
      <p>
        Priority:
        <span
          className={`btn ${story.priority.toLowerCase()}-priority btn--small`}
        >
          {story.priority}
        </span>
      </p>
      <p>
        Status:
        <span className={`btn status-${story.status.toLowerCase()} btn--small`}>
          {story.status}
        </span>
      </p>
      <div className="flex">
        <button
          className="btn btn--edit"
          onClick={() => handleEditStory(story.id)}
        >
          Edit
        </button>

        <button
          className="btn btn--delete"
          onClick={() => handleDeleteStory(story.id)}
        >
          Delete
        </button>
        <button
          className="btn btn--open"
          onClick={() => handleOpenStory(story.id)}
        >
          Open
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button className="btn" onClick={() => navigate(-1)}>
        Back
      </button>
      <section className="block grid container">
        <section className="form-container">
          <form className="form-signin" onSubmit={handleAddOrUpdateStory}>
            <h1>{editStoryId ? "Edit Story" : "Add Story"}</h1>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                value={storyName}
                onChange={(e) => setStoryName(e.target.value)}
                placeholder="Story Name"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                value={storyDescription}
                onChange={(e) => setStoryDescription(e.target.value)}
                placeholder="Description"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select
                className="form-control"
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as "Low" | "Medium" | "High")
                }
              >
                <option className="low-priority" value="Low">
                  Low
                </option>
                <option className="medium-priority" value="Medium">
                  Medium
                </option>
                <option className="high-priority" value="High">
                  High
                </option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                className="form-control"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "Todo" | "Doing" | "Done")
                }
              >
                <option className="status-todo" value="Todo">
                  Todo
                </option>
                <option className="status-doing" value="Doing">
                  Doing
                </option>
                <option className="status-done" value="Done">
                  Done
                </option>
              </select>
            </div>
            <button className="btn btn--accent btn--form" type="submit">
              {editStoryId ? "Save Changes" : "Add"}
            </button>
          </form>
        </section>
        <h2>Stories from project: {projectName}</h2>
        <div className="kanban-board">
          <div className="kanban-column status-todo">
            <h2>Todo</h2>
            {stories
              .filter((story) => story.status === "Todo")
              .map(renderStory)}
          </div>
          <div className="kanban-column status-doing">
            <h2>Doing</h2>
            {stories
              .filter((story) => story.status === "Doing")
              .map(renderStory)}
          </div>
          <div className="kanban-column status-done">
            <h2>Done</h2>
            {stories
              .filter((story) => story.status === "Done")
              .map(renderStory)}
          </div>
        </div>
      </section>
    </>
  );
};

export default StoryForm;

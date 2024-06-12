import React, { useEffect, useState } from "react";
import { Story } from "../models/Story";
import { ProjectManager } from "../services/ProjectService";
import { LocalRepository } from "../api/ApiService";
import { UserService } from "../services/UserService";
import TaskForm from "./TaskForm";
import "../index.css";

interface StoryFormProps {
  project: {
    id: string;
    name: string;
  };
}

const StoryForm: React.FC<StoryFormProps> = ({ project }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [storyName, setStoryName] = useState("");
  const [storyDescription, setStoryDescription] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Low");
  const [status, setStatus] = useState<"Todo" | "Doing" | "Done">("Todo");
  const [editStoryId, setEditStoryId] = useState<string | null>(null);
  const [currentStoryId, setCurrentStory] = useState<Story | null>(null);

  useEffect(() => {
    refreshStoryList();
  }, []);

  const projectManager = new ProjectManager(new LocalRepository());
  const currentUser = UserService.getCurrentUser();

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
      alert("Nie można usunąć story - story o podanym ID nie istnieje");
    }
  };

  const handleOpenStory = (story: Story) => {
    setCurrentStory(story);
    projectManager.setCurrentStory(story.id);
  };

  return (
    <>
      <section className="block grid container">
        <section className="form-container">
          <form className="form-signin" onSubmit={handleAddOrUpdateStory}>
            <h1>Add Story</h1>
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
        <div className="story-list">
          <h2>Stories from project: {project.name}</h2>
          {stories.map((story) => (
            <div key={story.id} className="flex">
              <h3>{story.name}</h3>
              <p>{story.description}</p>
              <p>Priority:<span className={`btn ${story.priority.toLowerCase()}-priority`}>{story.priority}</span> </p>
              <p>Status: <span className={`btn status-${story.status.toLowerCase()}`}>{story.status}</span></p>
              <p>User: {story.ownerId}</p>
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
                onClick={() => handleOpenStory(story)}
              >
                Open
              </button>
            </div>
          ))}
        </div>
      </section>
      {currentStoryId && <TaskForm story={currentStoryId} />}
    </>
  );
};

export default StoryForm;

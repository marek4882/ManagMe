import React, { useState, useEffect } from "react";
import { Task } from "../models/Task";
import { ProjectManager } from "../services/ProjectService";
import { LocalRepository } from "../api/ApiService";
import { mockUsers } from "../models/User";

interface TaskFormProps {
  story: {
    id: string;
    name: string;
  };
}

const TaskForm: React.FC<TaskFormProps> = ({ story }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Low");
  const [estimatedTime, setEstimatedTime] = useState(1);
  const [state, setState] = useState<"Todo" | "Doing" | "Done">("Todo");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [assignee, setAssignee] = useState<string>("");

  const projectManager = new ProjectManager(new LocalRepository());

  useEffect(() => {
    refreshTaskList();
  }, [story]);

  const handleAddOrUpdateTask = (event: React.FormEvent) => {
    event.preventDefault();

    if (taskName && taskDescription && priority && state && assignee) {
      if (editTaskId) {
        const updated = projectManager.updateTask(
          editTaskId,
          taskName,
          taskDescription,
          priority,
          state
        );
        console.log("Task updated: ", updated);
      } else {
        const newState = assignee ? "Doing" : "Todo";

        projectManager.addTask(
          taskName,
          taskDescription,
          priority,
          newState,
          estimatedTime,
          assignee
        );
      }
      setTaskName("");
      setTaskDescription("");
      setPriority("Low");
      setState("Todo");
      setEstimatedTime(1);
      setAssignee("");
      setEditTaskId(null);
      refreshTaskList();
    }
  };

  const refreshTaskList = () => {
    const tasks = projectManager.readTasks();
    setTasks(tasks.filter((task) => task.storyId === story.id));
    console.log("Tasks refreshed: ", tasks);
  };

  const handleEditTask = (taskId: string) => {
    const task = projectManager.readTask(taskId);
    if (task) {
      setTaskName(task.name);
      setTaskDescription(task.description);
      setPriority(task.priority);
      setState(task.state);
      setEstimatedTime(task.estimatedTime);
      setAssignee(task.userId);
      setEditTaskId(task.id);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    projectManager.deleteTask(taskId);
    refreshTaskList();
  };

  return (
    <section className="block grid container">
      <section className="form-container">
        <form className="form-signin" onSubmit={handleAddOrUpdateTask}>
          <h1>Add Task</h1>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Task Name"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
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
              value={state}
              onChange={(e) =>
                setState(e.target.value as "Todo" | "Doing" | "Done")
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
          <div className="form-group">
            <label>Estimated Time (hours)</label>
            <input
              className="form-control"
              type="number"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(Number(e.target.value))}
              placeholder="Estimated Time"
              required
            />
          </div>
          <div className="form-group">
            <label>Assignee</label>
            <select
              className="form-control"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            >
              <option value="">Select Assignee</option>
              {mockUsers
                .filter(
                  (user) => user.role === "Devops" || user.role === "Developer"
                )
                .map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} {user.surname} ({user.role})
                  </option>
                ))}
            </select>
          </div>
          <button className="btn btn--accent btn--form" type="submit">
            {editTaskId ? "Save Changes" : "Add"}
          </button>
        </form>
      </section>
      <div className="task-list">
        {story && <h2>Tasks for Story: {story.name}</h2>}
        {tasks.map((task) => (
          <div key={task.id} className="flex">
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <p>
              Priority:
              <span className={`btn ${task.priority.toLowerCase()}-priority`}>
                {task.priority}
              </span>{" "}
            </p>
            <p>
              State:{" "}
              <span className={`btn status-${task.state.toLowerCase()}`}>
                {task.state}
              </span>
            </p>
            <p>Estimated Time: {task.estimatedTime} hours</p>
            <p>
              {task.state === "Doing"} Start Date: {task.startDate}
            </p>
            {task.state === "Done" && (
              <p>
                End Date:{" "}
                {task.endDate ? task.endDate.toString() : "Not available"}
              </p>
            )}
            <p>Assignee: {task.userId}</p>
            <button
              className="btn btn--edit"
              onClick={() => handleEditTask(task.id)}
            >
              Edit
            </button>
            <button
              className="btn btn--delete"
              onClick={() => handleDeleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TaskForm;

import React, { useEffect, useState } from "react";
import { Task } from "../models/Task";
import { ProjectManager } from "../services/ProjectService";
import { LocalRepository } from "../api/ApiService";
import { UserService} from "../services/UserService";

interface TaskDetailsProps {
  taskId: string; 
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ taskId }) => {
  const [task, setTask] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescriptin] = useState("")
  const [assignee, setAssignee] = useState<string>("");
  const projectManager = new ProjectManager(new LocalRepository());
  const currentUser = UserService.getCurrentUser();

  useEffect(() => {
    const taskData = projectManager.readTask(taskId);
    if (taskData) {
      setTask(taskData);
      setAssignee(taskData.assigneeId);
    }
  }, [taskId]);

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAssignee = e.target.value;
    setAssignee(newAssignee);
    if (task) {
      projectManager.updateTask(task.id, {
        assigneeId: newAssignee,
        status: "Doing",
        startDate: new Date(),
      });
      setTask({ ...task, assigneeId: newAssignee, status: "Doing", startDate: new Date() });
    }
  };

  const handleStatusChange = () => {
    if (task) {
      const newStatus = task.status === "Doing" ? "Done" : task.status;
      projectManager.updateTask(task.id, {
        status: newStatus,
        endDate: newStatus === "Done" ? new Date() : null,
      });
      setTask({ ...task, status: newStatus, endDate: newStatus === "Done" ? new Date() : null });
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div>
      <h1>Task Details</h1>
      <p>Name: {task.name}</p>
      <p>Description: {task.description}</p>
      <p>Project ID: {task.projectId}</p>
      <p>Story ID: {task.storyId}</p>
      <p>Status: {task.state}</p>
      <p>Start Date: {task.startDate?.toString()}</p>
      <p>End Date: {task.endDate?.toString()}</p>
      <p>Assignee: {task.userId}</p>
      <div>
        <label>Assignee: </label>
        <select value={assignee} onChange={handleAssigneeChange}>
          <option value="">Select Assignee</option>
          {mockUsers
            .filter(user => user.role === "Devops" || user.role === "Developer")
            .map(user => (
              <option key={user.id} value={user.id}>
                {user.name} {user.surname} ({user.role})
              </option>
            ))}
        </select>
      </div>
      {task.state !== "Done" && (
        <button onClick={handleStatusChange}>Mark as Done</button>
      )}
    </div>
  );
};

export default TaskDetails;

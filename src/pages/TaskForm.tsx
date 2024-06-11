import React, { useEffect, useState } from "react";
import { Task } from "../models/Task";
import { ProjectManager } from "../services/ProjectService";
import { LocalRepository } from "../api/ApiService";
import { UserService} from "../services/UserService";
import { mockUsers } from "../models/User";

interface TaskDetailsProps {
  taskId: string; 
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ taskId }) => {
  const [task, setTask] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Low");
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [state, setStatus] = useState<"Todo" | "Doing" | "Done">("Todo");
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [assignee, setAssignee] = useState<string>("");
  
    useEffect(() =>{
        refreshTaskList();
    },[]);
  const projectManager = new ProjectManager(new LocalRepository());
  const allUsers = UserService.getAllMockUsers();

const handleAddOrUpdateStory = (event: React.FormEvent) =>{
    event.preventDefault();

    if(taskName && taskDescription && priority && status){
        if(editTaskId){
            const updated = projectManager.updateTask(editTaskId, taskName, taskDescription, priority, state)
            console.log("Task updated: ", updated);
        }else{
            projectManager.addTask(taskName, taskDescription, priority, state, estimatedTime, allUsers? );
        }
        setTaskName("");
        setTaskDescription("");
        setPriority("Low");
        setStatus("Todo");
        setEditTaskId(null);
        refreshTaskList();
    }
}

    const refreshTaskList = () => {
        const tasks = projectManager.readTasks();
        setTask(tasks);
        console.log("Task refreshed: ", tasks)
    }

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
      <p>Name: {task[0].name}</p>
      <p>Description: {task[0].description}</p>
      <p>Project ID: {task[0].projectId}</p>
      <p>Status: {task[0].state}</p>
      <p>Start Date: {task[0].startDate?.toString()}</p>
      <p>End Date: {task[0].endDate?.toString()}</p>
      <p>Assignee: {task[0].userId}</p>
      <div>
        <label>Assignee: </label>
        <select value={assignee} onChange={handleAssigneeChange}>
          <option value="">Select Assignee</option>
          {allUsers
            .filter(user => user.role === "Devops" || user.role === "Developer")
            .map(user => (
              <option key={user.id} value={user.id}>
                {user.name} {user.surname} ({user.role})
              </option>
            ))}
        </select>
      </div>
      {task[0].state !== "Done" && (
        <button onClick={handleStatusChange}>Mark as Done</button>
      )}
    </div>
  );
};

export default TaskDetails;

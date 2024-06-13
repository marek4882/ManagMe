import { Repository } from "../api/ApiService";
import { Project } from "../models/Project";
import { v4 as uuid } from "uuid";
import { Story } from "../models/Story";
import { Task } from "../models/Task";

export class ProjectManager {
  private repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  // Project Management Methods
  public addProject(name: string, description: string): void {
    const projects = this.repository.readProjects();
    const project: Project = {
      id: uuid(),
      name,
      description,
    };
    projects.push(project);
    this.repository.saveProjects(projects);
  }

  public readProjects(): Project[] {
    return this.repository.readProjects();
  }

  public updateProject(
    id: string,
    newName: string,
    newDescription: string
  ): boolean {
    const projects = this.repository.readProjects();
    const index = projects.findIndex((project) => project.id === id);
    if (index !== -1) {
      projects[index].name = newName;
      projects[index].description = newDescription;
      this.repository.saveProjects(projects);
      return true;
    }
    return false;
  }

  public deleteProject(id: string): boolean {
    const projects = this.repository.readProjects();
    const index = projects.findIndex((project) => project.id === id);
    if (index !== -1) {
      projects.splice(index, 1);
      this.repository.saveProjects(projects);
      return true;
    }
    return false;
  }

  public setCurrentProject(id: string): void {
    this.repository.setCurrentProject(id);
  }

  public getCurrentProjectId(): string | null {
    return this.repository.getCurrentProjectId();
  }
  public getProjectName(projectId: string): string {
    const projects = this.readProjects();
    const project = projects.find((project) => project.id === projectId);
    return project ? project.name : "Unknown Project";
  }

  // Story Management Methods
  public addStory(
    name: string,
    description: string,
    priority: "Low" | "Medium" | "High",
    status: "Todo" | "Doing" | "Done",
    ownerId: string
  ): void {
    const stories = this.repository.readStories();
    const story: Story = {
      id: uuid(),
      name,
      description,
      priority,
      status,
      ownerId,
      projectId: this.getCurrentProjectId() || "",
      creationDate: new Date(),
    };
    stories.push(story);
    this.repository.saveStories(stories);
  }

  public readStories(): Story[] {
    const stories = this.repository.readStories();
    const currentProjectId = this.getCurrentProjectId();
    return stories.filter((story) => story.projectId === currentProjectId);
  }

  public updateStory(
    id: string,
    newName: string,
    newDescription: string,
    newPriority: "Low" | "Medium" | "High",
    newStatus: "Todo" | "Doing" | "Done"
  ): boolean {
    const stories = this.repository.readStories();
    const index = stories.findIndex((story) => story.id === id);
    if (index !== -1) {
      stories[index].name = newName;
      stories[index].description = newDescription;
      stories[index].priority = newPriority;
      stories[index].status = newStatus;
      this.repository.saveStories(stories);
      return true;
    }
    return false;
  }

  public deleteStory(id: string): boolean {
    const stories = this.repository.readStories();
    const index = stories.findIndex((story) => story.id === id);
    if (index !== -1) {
      stories.splice(index, 1);
      this.repository.saveStories(stories);
      return true;
    }
    return false;
  }
  public setCurrentStory(id: string): void {
    this.repository.setCurrentStory(id);
  }

  public getCurrentStoryId(): string | null {
    return this.repository.getCurrentStoryId();
  }
  public getStoryName(storyId: string): string {
    const stories = this.readStories();
    const story = stories.find((story) => story.id === storyId);
    return story ? story.name : "Unknown Story";
  }
  // Task Management Methods
  public addTask(
    name: string,
    description: string,
    priority: "Low" | "Medium" | "High",
    state: "Todo" | "Doing" | "Done",
    estimatedTime: number,
    assigneeId: string
  ): void {
    const tasks = this.repository.readTasks();
    const task: Task = {
      id: uuid(),
      name,
      description,
      priority,
      storyId: this.repository.getCurrentStoryId() || "",
      estimatedTime,
      state,
      startDate: new Date(),
      endDate: new Date(),
      assigneeId,
    };
    tasks.push(task);
    console.log(task);
    this.repository.saveTasks(tasks);
  }

  public readTasks(): Task[] {
    const tasks = this.repository.readTasks();
    const currentStoryId = this.getCurrentStoryId();
    return tasks.filter((task) => task.storyId === currentStoryId);
  }

  public updateTask(
    id: string,
    newName: string,
    newDescription: string,
    newPriority: "Low" | "Medium" | "High",
    newState: "Todo" | "Doing" | "Done",
    newAssignee: string
  ): boolean {
    const tasks = this.repository.readTasks();
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasks[index].name = newName;
      tasks[index].description = newDescription;
      tasks[index].priority = newPriority;
      tasks[index].state = newState;
      tasks[index].assigneeId = newAssignee;
      if (newState === "Done") {
        tasks[index].endDate = new Date();
      }
      this.repository.saveTasks(tasks);
      return true;
    }
    return false;
  }

  public deleteTask(id: string): boolean {
    const tasks = this.repository.readTasks();
    const initialLength = tasks.length;
    const updatedTasks = tasks.filter((task) => task.id !== id);
    if (updatedTasks.length !== initialLength) {
      this.repository.saveTasks(updatedTasks);
      return true;
    }
    return false;
  }
  public setCurrentTask(id: string): void {
    this.repository.setCurrentTask(id);
  }

  public getCurrentTaskId(): string | null {
    return this.repository.getCurrentTaskId();
  }
}

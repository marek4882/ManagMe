import { LocalRepository, Repository } from "../api/ApiService";
import { Project } from "../models/Project";
import { Story } from "../models/Story";
import { v4 as uuid } from "uuid";
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

  public updateProject(id: string, newName: string, newDescription: string): boolean {
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
    const initialLength = projects.length;
    const updatedProjects = projects.filter((project) => project.id !== id);
    if (updatedProjects.length !== initialLength) {
      this.repository.saveProjects(updatedProjects);
      return true;
    }
    return false;
  }

  public setCurrentProject(id: string): void {
    this.repository.setCurrentProject(id);
  }

  public getCurrentProject(): Project | null {
    const currentProjectId = this.repository.getCurrentProjectId();
    if (currentProjectId) {
      return this.repository.readProjects().find(project => project.id === currentProjectId) || null;
    }
    return null;
  }


  // Story Management Methods
  public addStory(name: string, description: string, priority: "Low" | "Medium" | "High", status: "Todo" | "Doing" | "Done", ownerId: string): void {
    const stories = this.repository.readStories();
    const story: Story = {
      id: uuid(),
      name,
      description,
      priority,
      projectId: this.repository.getCurrentProjectId() || "",
      creationDate: new Date(),
      status,
      ownerId,
    };
    stories.push(story);
    console.log(stories);
    this.repository.saveStories(stories);
  }

  public readStories(): Story[] {
    return this.repository.readStories().filter(story => story.projectId === this.getCurrentProject()?.id);
  }

  public updateStory(id: string, newName: string, newDescription: string, newPriority: "Low" | "Medium" | "High", newStatus: "Todo" | "Doing" | "Done"): boolean {
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
    const initialLength = stories.length;
    const updatedStories = stories.filter((story) => story.id !== id);
    if (updatedStories.length !== initialLength) {
      this.repository.saveStories(updatedStories);
      return true;
    }
    return false;
  }
  public setCurrentStory(id:string):void{
    this.repository.setCurrentProject(id);
  }
  public getCurrentStory(): Story | null{
    const currentStoryId = this.repository.getCurrentProjectId();
    if (currentStoryId){
      return this.repository.readStories().find(story => story.id === currentStoryId) || null
    }
    return null
  }
  // Task
  public addTask(name: string, description: string, storyId: string, assigneeId: string): void {
    const tasks = this.repository.readTasks();
    const task: Task = {
      id: uuid(),
      name,
      description,
      projectId: this.repository.getCurrentProjectId() || "",
      storyId,
      assigneeId,
      status: "Todo",
      startDate: undefined,
      endDate: undefined,
      hoursWorked: 0,
    };
    tasks.push(task);
    this.repository.saveTasks(tasks);
  }

  public readTasks(): Task[] {
    return this.repository.readTasks().filter(task => task.projectId === this.getCurrentProject()?.id);
  }

  public readTask(id: string): Task | null {
    const tasks = this.repository.readTasks();
    return tasks.find((task) => task.id === id) || null;
  }

  public updateTask(id: string, updatedTask: Partial<Task>): boolean {
    const tasks = this.repository.readTasks();
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updatedTask };
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
}


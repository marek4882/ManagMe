import { Project } from "../models/Project";
import { Story } from "../models/Story";
import { Task } from "../models/Task";

export interface Repository {
  readProjects(): Project[];
  saveProjects(projects: Project[]): void;
  readStories(): Story[];
  saveStories(stories: Story[]): void;
  readTasks(): Task[];
  saveTasks(tasks: Task[]): void;
  setCurrentProject(id: string): void;
  getCurrentProjectId(): string | null;
  setCurrentStory(id: string): void;
  getCurrentStoryId(): string | null;
  setCurrentTask(id: string): void;
  getCurrentTaskId(): string | null;
}

export class LocalRepository implements Repository {
  private static readonly projectsStorageKey = "projects";
  private static readonly storiesStorageKey = "stories";
  private static readonly tasksStorageKey = "tasks";
  private static readonly currentProjectKey = "currentProject";
  private static readonly currentStoryKey = "currentStory";
  private static readonly currentTaskKey = "currentTask";

  public readProjects(): Project[] {
    const projectsData = localStorage.getItem(
      LocalRepository.projectsStorageKey
    );
    return projectsData ? JSON.parse(projectsData) : [];
  }

  public saveProjects(projects: Project[]): void {
    localStorage.setItem(
      LocalRepository.projectsStorageKey,
      JSON.stringify(projects)
    );
  }

  public readStories(): Story[] {
    const storiesData = localStorage.getItem(LocalRepository.storiesStorageKey);
    return storiesData ? JSON.parse(storiesData) : [];
  }

  public saveStories(stories: Story[]): void {
    localStorage.setItem(
      LocalRepository.storiesStorageKey,
      JSON.stringify(stories)
    );
  }

  public setCurrentProject(id: string): void {
    localStorage.setItem(LocalRepository.currentProjectKey, id);
  }

  public getCurrentProjectId(): string | null {
    return localStorage.getItem(LocalRepository.currentProjectKey);
  }


  public setCurrentStory(id: string): void {
    localStorage.setItem(LocalRepository.currentStoryKey, id);
  }

  public getCurrentStoryId(): string | null { 
    return localStorage.getItem(LocalRepository.currentStoryKey);
  }

  public readTasks(): Task[] {
    const tasksData = localStorage.getItem(LocalRepository.tasksStorageKey);
    return tasksData ? JSON.parse(tasksData) : [];
  }

  public saveTasks(tasks: Task[]): void {
    localStorage.setItem(
      LocalRepository.tasksStorageKey,
      JSON.stringify(tasks)
    );
  }
  public setCurrentTask(id: string): void {
    localStorage.setItem(LocalRepository.currentTaskKey, id);
  }
  public getCurrentTaskId(): string | null {
    return localStorage.getItem(LocalRepository.currentTaskKey)
  }
}

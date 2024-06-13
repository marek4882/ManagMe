import { Project } from "../models/Project";
import { Story } from "../models/Story";
import { Task } from "../models/Task";

export interface Repository {
  // project
  readProjects(): Project[];
  saveProjects(projects: Project[]): void;

  setCurrentProject(project: string): void;
  getCurrentProjectId(): string | null;
  // story
  readStories(): Story[];
  saveStories(stories: Story[]): void;

  setCurrentStory(id: string): void;
  getCurrentStoryId(): string | null;

  // task
  readTasks(): Task[];
  saveTasks(tasks: Task[]): void;

  setCurrentTask(id: string): void;
  getCurrentTaskId(): string | null;
}
export class LocalRepository implements Repository {
  private static readonly projectsStorageKey = "projects";
  private static readonly currentProjectKey = "currentProject";
  private static readonly storiesStorageKey = "stories";
  private static readonly currentStoryKey = "currentStory";
  private static readonly tasksStorageKey = "tasks";
  private static readonly currentTaskKey = "currentTask";

  //   Project
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
  public setCurrentProject(id: string): void {
    localStorage.setItem(LocalRepository.currentProjectKey, id);
  }

  public getCurrentProjectId(): string | null {
    const currentProjectId = localStorage.getItem(
      LocalRepository.currentProjectKey
    );
    console.log(`Current Project ID: ${currentProjectId}`);
    return currentProjectId;
  }

  //   Story
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

  public setCurrentStory(id: string): void {
    localStorage.setItem(LocalRepository.currentStoryKey, id);
  }

  public getCurrentStoryId(): string | null {
    const currentStoryId = localStorage.getItem(
      LocalRepository.currentStoryKey
    );
    console.log(`Current Story ID: ${currentStoryId}`);
    return currentStoryId;
  }

  //   Task
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
    return localStorage.getItem(LocalRepository.currentTaskKey);
  }
}

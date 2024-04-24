import { Project } from "../models/Project";


export interface Repository {
    readProjects(): Project[];
    saveProjects(projects: Project[]): void;
  }
  
  export class LocalRepository implements Repository {
    private static readonly storageKey = "projects";
  
    public readProjects(): Project[] {
      const projectsData = localStorage.getItem(LocalRepository.storageKey);
      return projectsData ? JSON.parse(projectsData) : [];
    }
  
    public saveProjects(projects: Project[]): void {
      localStorage.setItem(LocalRepository.storageKey, JSON.stringify(projects));
    }
  }
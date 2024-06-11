import { User, mockUsers } from "../models/User";

export class UserService {
    private static readonly currentUserKey = "currentUser";
  
    public static getCurrentUser(): User | null {
      const userData = localStorage.getItem(UserService.currentUserKey);
      return userData ? JSON.parse(userData) : null;
    }
  
    public static setCurrentUser(user: User): void {
      localStorage.setItem(UserService.currentUserKey, JSON.stringify(user));
    }
  }
  
  UserService.setCurrentUser(mockUsers[0]);



export interface User {
  id: string;
  name: string;
  surname: string;
  role: "Admin" | "Devops" | "Developer";
  login: string;
  password: string;
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Marek",
    surname: "Ćwioro",
    role: "Admin",
    login: "user1",
    password: "password1",
  },
  {
    id: "2",
    name: "Jan",
    surname: "Kowalski",
    role: "Devops",
    login: "user2",
    password: "password2",
  },
  {
    id: "3",
    name: "Barbara",
    surname: "Pravi",
    role: "Developer",
    login: "user3",
    password: "password3",
  },
  {
    id: "4",
    name: "Piotr",
    surname: "Żyła",
    role: "Developer",
    login: "user4",
    password: "password4",
  },
];

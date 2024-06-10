export interface User{
    id: string;
    name: string;
    surname: string;
    role: "Admin" | "Devops" | "Developer"
}

export const mockUsers: User[] = [
    {
      id: "1",
      name: "Marek",
      surname: "Ćwioro",
      role: "Admin"
    },
    {
        id: "2",
        name: "Jan",
        surname: "Kowalski",
        role: "Devops"
    },
    {
        id: "3",
        name: "Barbara",
        surname: "Pravi",
        role: "Developer"
    },
    {
        id: "4",
        name: "Piotr",
        surname: "Żyła",
        role: "Developer"
    },
];
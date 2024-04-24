export interface User{
    id: string;
    name: string;
    surname: string;
    role: "Admin" | "Devops" | "Developer"
}
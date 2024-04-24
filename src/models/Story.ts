export interface Story{
    id: string;
    name: string;
    description: string;
    priority: "Low" | "Medium" | "High"
    projectid: string;
    creationDate: Date;
    status: "Todo" | "Doing" | "Done"
    ownerId: string;
}
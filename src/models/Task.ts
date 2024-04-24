import { Story } from "./Story";
import { User } from "./User";

export interface Task{
    id: string;
    name: string;
    description: string;
    priority: "Low" | "Medium" | "High";
    story: Story;
    estimatedTime: number;
    state: "Todo" | "Doing" | "Done";
    creationDate: Date;
    startDate?: Date;
    endDate?: Date;
    user?: User;
}
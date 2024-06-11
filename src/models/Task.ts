export interface Task{
    id: string;
    name: string;
    description: string;
    priority: "Low" | "Medium" | "High";
    storyId: string;
    estimatedTime: number;
    state: "Todo" | "Doing" | "Done";
    startDate?: Date | undefined; 
    endDate?: Date | undefined;
    userId: string;
}
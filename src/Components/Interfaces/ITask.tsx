// Interfaces/ITask.ts
export interface ITask {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    dueDate: string;
    status: string; // Add status property
}

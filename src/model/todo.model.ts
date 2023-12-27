export interface TaskItemModel {
    id: number;
    title: string;
    description: string;
    type: string;
    due?: Date;
}
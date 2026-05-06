export interface Notification {
  id: number;
  title: string;
  description: string;
  taskId: number | null;
  accountId: number;
  time: string;
  viewed: boolean;
  type: string;
}

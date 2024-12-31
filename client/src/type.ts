export interface todoData {
  id: number;
  text: string;
  //boolean?
}

export interface DailyData {
  todoDataArray: todoData[];
  memoData: string;
}

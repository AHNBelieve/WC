interface todoData {
  id: string;
  text: string;
  //boolean?
}

interface dailyData {
  todoDataArray: todoData[];
  memoData: string;
}

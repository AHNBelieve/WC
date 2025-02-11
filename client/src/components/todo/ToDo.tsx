import { DragDropContext, DropResult } from "react-beautiful-dnd";
import DroppableToDo from "./DroppableToDo";
import { todoData } from "../../type";
import React, { useEffect } from "react";
import { DefaultTheme } from "styled-components/dist/types";

interface Props {
  todoDataArray: todoData[];
  setTodoDataArray: React.Dispatch<React.SetStateAction<todoData[]>>;
  updatingHandler: () => void;
  setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
}
function ToDo({ todoDataArray, setTodoDataArray, updatingHandler, setTheme }: Props) {
  useEffect(() => {
    updatingHandler();
  }, [todoDataArray]);
  const onDragEnd = ({ destination, source }: DropResult) => {
    // 드래그가 끝났을 때 호출, destination은 목적지, source는 출발지

    if (!destination) return; // 드롭 위치가 없으면 종료
    // 같은 보드 내에서의 드래그
    if (destination.droppableId === source.droppableId) {
      setTodoDataArray((todoDataArray: todoData[]) => {
        const todoCopy = todoDataArray; // 현재 드래그된 보드의 복사본
        const taskObj = todoCopy[source.index];
        // Todo 재배치
        todoCopy.splice(source.index, 1);
        todoCopy.splice(destination.index, 0, taskObj);
        return todoCopy;
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DroppableToDo
        todoDataArray={todoDataArray}
        setTodoDataArray={setTodoDataArray}
        updatingHandler={updatingHandler}
        setTheme={setTheme}
      />
    </DragDropContext>
  );
}

export default ToDo;

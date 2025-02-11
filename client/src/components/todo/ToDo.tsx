import { DragDropContext, DropResult } from "react-beautiful-dnd";
import DroppableToDo from "./DroppableToDo";
import { todoData } from "../../type";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaRegSave } from "react-icons/fa";

const StyledFaRegSave = styled.div`
  grid-column: 1;
  grid-row: 1;
  display: flex;
  align-items: center;
  svg {
    width: 10px;
    height: 10px;
  }
  svg:hover {
    transition: 0.6s ease-in-out;
    color: #6495ed;
  }
`;

interface Props {
  todoDataArray: todoData[];
  setTodoDataArray: React.Dispatch<React.SetStateAction<todoData[]>>;
  updatingHandler: () => void;
}

function ToDo({ todoDataArray, setTodoDataArray, updatingHandler }: Props) {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false); // 첫 실행을 막음
      return;
    }

    updatingHandler();
  }, [todoDataArray]);
  const onDragEnd = async ({ destination, source }: DropResult) => {
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
      updatingHandler();
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DroppableToDo
        todoDataArray={todoDataArray}
        setTodoDataArray={setTodoDataArray}
      />
    </DragDropContext>
  );
}

export default ToDo;

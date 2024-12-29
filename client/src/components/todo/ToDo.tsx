import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "../../atoms";
import DroppableToDo from "./DroppableToDo";
import ToDoMemo from "./ToDoMemo";
import { dailyData, todoData } from "../../type";

const ToDoBoard = styled.div`
  width: 92%;
  height: 42%;
  border-radius: 56px;
  display: grid;
  grid-template-columns: 10fr 7fr;
  grid-template-rows: 40px 270px;
  gap: 5px;
`;

interface Props {
  dailyData: dailyData | null;
  setDailyData: React.Dispatch<React.SetStateAction<dailyData>>;
}

function ToDo({ dailyData, setDailyData }: Props) {
  const [toDos, setTodoState] = useRecoilState(toDoState);
  const onDragEnd = ({ destination, source }: DropResult) => {
    // 드래그가 끝났을 때 호출, destination은 목적지, source는 출발지

    if (!destination) return; // 드롭 위치가 없으면 종료
    // 같은 보드 내에서의 드래그
    if (destination.droppableId === source.droppableId) {
      setTodoState((ToDos) => {
        const toDoCopy = [...ToDos[source.droppableId]]; // 현재 드래그된 보드의 복사본
        const taskObj = toDoCopy[source.index];
        // Todo 재배치
        toDoCopy.splice(source.index, 1);
        toDoCopy.splice(destination.index, 0, taskObj);
        return {
          [source.droppableId]: toDoCopy,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ToDoBoard>
        <DroppableToDo toDos={toDos["To Do"]} />
        <ToDoMemo />
      </ToDoBoard>
    </DragDropContext>
  );
}

export default ToDo;

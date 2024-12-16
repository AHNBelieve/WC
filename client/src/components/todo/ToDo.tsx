import styled from "styled-components";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from "recoil";
import { toDoState } from "../../atoms";
import DroppableToDo from "./DroppableToDo";

const ToDoBoard = styled.div`
  border-radius: 56px;
  width: 92%;
  height: 42%;
  display: grid;
  grid-template-columns: 10fr 7fr;
  grid-template-rows: 40px 270px;
  gap: 5px;
  padding: 10px 30px;
`;

const ToDoMemo = styled.textarea`
    width: 100%;
    height: 100%;
    grid-column: 2;
    grid-row: 2;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 15px;
    padding: 20px;
    resize: none;
    color: white;
    &:focus{
        outline: none;
    }
    /* 스크롤바 스타일 */
    &::-webkit-scrollbar{
        height: 20px;
        width: 20px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ad9eff; /* 스크롤바 색상 */
        border-radius: 15px; /* 스크롤바 모서리 둥글게 */
    }

`;

function ToDo() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = ({ destination, source }: DropResult) => {
        if (!destination) return; // 드롭 위치가 없으면 종료
        // 같은 보드 내에서의 드래그
        if (destination.droppableId === source.droppableId) {
            setToDos((allBoards) => {
                const boardCopy = [...allBoards[source.droppableId]]; // 현재 드래그된 보드의 복사본
                const taskObj = boardCopy[source.index];

                // 아이템 재배치
                boardCopy.splice(source.index, 1);
                boardCopy.splice(destination.index, 0, taskObj);

                return {
                    ...allBoards,
                    [source.droppableId]: boardCopy,
                };
            });
        }
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <ToDoBoard>
                <DroppableToDo toDos={toDos["To Do"]} />
                <ToDoMemo placeholder="메모 입력" />
            </ToDoBoard>
        </DragDropContext>
    );
}

export default ToDo;
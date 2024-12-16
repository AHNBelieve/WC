import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../../atoms";

const ToDoCard = styled.div`
    width: 100%;
    height: 40px;
    margin: 4px 0;
    border-radius: 12px;
    grid-column: 1 span 1;
    grid-row: 2 span 1;
    background-color: #bbaef5;
    padding-left: 10px;
    color: white;
    display: flex;
    align-items: center;
    display: grid;
    grid-template-columns: 20px auto 35px 35px;
`;

interface IDragabbleCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
}

function DraggableToDo({ toDoId, toDoText, index }: IDragabbleCardProps) {
    const setTodoState = useSetRecoilState(toDoState);
    const onDelete = () => {
        setTodoState((prevTodos) => {
            const updatedTodos = { ...prevTodos };
            const categories = Object.keys(updatedTodos);
            for (let i = 0; i < (categories.length); i++) {
                // "To Do", "Doing", "Done" 중 해당 ID를 찾아서 삭제
                updatedTodos[categories[i]] = updatedTodos[categories[i]].filter((todo) => todo.id !== toDoId);
            }
            return updatedTodos;
        });
    };
    return (
        <Draggable draggableId={toDoId + ""} index={index}>
            {(provided) => (
                <ToDoCard
                    ref={provided.innerRef} // ref를 제공하여 드래그 가능하게 설정
                    {...provided.draggableProps} // 드래그 가능한 속성
                    {...provided.dragHandleProps} // 드래그 핸들 속성
                >
                    <input type="checkbox"></input>
                    {toDoText}
                    <button>수정</button>
                    <button onClick={onDelete}>삭제</button>
                </ToDoCard>
            )}
        </Draggable>
    );
}

export default React.memo(DraggableToDo);
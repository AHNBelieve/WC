import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const ToDoCard = styled.div`
    width: 85%;
    height: 40px;
    margin: 4px 0;
    border-radius: 12px;
    background-color: #bbaef5;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
    color: white;
    grid-column: 1 span 1;
    grid-row: 2 span 1;
`;

interface IDragabbleCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
}

function DraggableToDo({ toDoId, toDoText, index }: IDragabbleCardProps) {
    return (
        <Draggable draggableId={toDoId + ""} index={index}>
            {(provided) => (
                <ToDoCard
                    ref={provided.innerRef} // ref를 제공하여 드래그 가능하게 설정
                    {...provided.draggableProps} // 드래그 가능한 속성
                    {...provided.dragHandleProps} // 드래그 핸들 속성
                >
                    {toDoText}
                </ToDoCard>
            )}
        </Draggable>
    );
}

export default React.memo(DraggableToDo);
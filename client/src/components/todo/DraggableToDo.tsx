import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../../atoms";
import { motion, AnimatePresence } from "framer-motion";

const ToDoCard = styled.div`
    width: 100%;
    height: 40px;
    border-radius: 12px;
    margin: 4px 0;
    background-color: #bbaef5;
    padding-left: 10px;
    color: white;
    display: grid;
    grid-template-columns: 20px auto 35px 35px;
    align-items: center;
`;

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`;

const PopUp = styled(motion.div)`
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    width: 300px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: space-evenly;
    z-index: 11;
`;

interface IDragabbleCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
}

function DraggableToDo({ toDoId, toDoText, index }: IDragabbleCardProps) {
    const setTodoState = useSetRecoilState(toDoState);
    const [showPop, setShowPop] = useState(false);
    const [newTodo, setNewTodo] = useState("");

    const onDelete = () => {
        setTodoState((prevTodos) => {
            const updatedTodos = { ...prevTodos };
            updatedTodos["To Do"] = updatedTodos["To Do"].filter((todo) => todo.id !== toDoId);
            return updatedTodos;
        });
    };

    const onModify = () => {
        setShowPop(true);
    };

    const handleSubmit = () => {
        if (newTodo.trim() !== "") {
            setTodoState((prevTodos) => {
                const updatedTodos = { ...prevTodos };
                updatedTodos["To Do"] = updatedTodos["To Do"].map((todo, idx) => {
                    return idx === index ? { ...todo, text: newTodo } : todo;
                });
                return updatedTodos;
            });
            setNewTodo("");
            setShowPop(false);
        } else {
            alert("유효하지 않은 입력");
        }
    };

    const handleClose = (event: React.MouseEvent) => {
        if (event.target instanceof HTMLElement && (event.target.id === "overlay" || event.target.id === "cancel")) {
            setShowPop(false);
            setNewTodo("");
        }
    };

    return (
        <>
            <Draggable draggableId={toDoId + ""} index={index}>
                {(provided) => (
                    <ToDoCard
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <input type="checkbox"></input>
                        {toDoText}
                        <button onClick={onModify}>수정</button>
                        <button onClick={onDelete}>삭제</button>
                    </ToDoCard>
                )}
            </Draggable>
            <AnimatePresence>
                {showPop && (
                    <Overlay
                        id="overlay"
                        onClick={handleClose}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <PopUp>
                            <h2>수정할 값을 적어</h2>
                            <input
                                type="text"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                placeholder="새로운 할 일"
                            />
                            <div>
                                <button onClick={handleSubmit}>제출</button>
                                <button id="cancel" onClick={handleClose}>취소</button>
                            </div>
                        </PopUp>
                    </Overlay>
                )}
            </AnimatePresence>
        </>
    );
}

export default React.memo(DraggableToDo);
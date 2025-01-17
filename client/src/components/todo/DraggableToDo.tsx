import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { todoData } from "../../type";
import { TiPencil } from "react-icons/ti";
import { LuEraser } from "react-icons/lu";
const ToDoCard = styled.div`
  width: 100%;
  height: 40px;
  margin: 4px 0;
  background-color: #d2e4fc;
  border-bottom-color: black;
  border-bottom: solid 1px;
  padding-left: 10px;
  color: black;
  display: grid;
  grid-template-columns: 20px auto 35px 35px;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
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

const StyledPencil = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  &:hover{
     transition: 0.8s ease-in-out;
      color: #6495ED;
    }
`;

const StyledLuEraser = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  &:hover{
    transition: 0.8s ease-in-out;
    color: #6495ED;
    }
`;

interface IDragabbleCardProps {
  todoId: number;
  todoText: string;
  index: number;
  setTodoDataArray: React.Dispatch<React.SetStateAction<todoData[]>>;
}

function DraggableToDo({
  todoId,
  todoText,
  index,
  setTodoDataArray,
}: IDragabbleCardProps) {
  // const setTodoState = useSetRecoilState(toDoState);
  const [showPop, setShowPop] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const onDelete = () => {
    setTodoDataArray((prevData) => {
      console.log(todoId, prevData);
      let updatedTodoDataArray = [...prevData];
      updatedTodoDataArray = updatedTodoDataArray.filter(
        (todoData: todoData) => todoData.id !== todoId
      );
      return updatedTodoDataArray;
    });
    // setTodoState((prevTodos) => {
    //   const updatedTodos = { ...prevTodos };
    //   updatedTodos["To Do"] = updatedTodos["To Do"].filter(
    //     (todo) => todo.id !== toDoId
    //   );
    //   return updatedTodos;
    // });
  };

  const onModify = () => {
    setShowPop(true);
  };

  const handleSubmit = () => {
    if (newTodo.trim() !== "") {
      setTodoDataArray((prevData) => {
        let updatedTodoDataArray = [...prevData];
        updatedTodoDataArray = updatedTodoDataArray.map(
          (todoData: todoData, idx) => {
            return idx === index ? { ...todoData, text: newTodo } : todoData;
          }
        );
        return updatedTodoDataArray;
      });

      //   setTodoState((prevTodos) => {
      //     const updatedTodos = { ...prevTodos };
      //     updatedTodos["To Do"] = updatedTodos["To Do"].map((todo, idx) => {
      //       return idx === index ? { ...todo, text: newTodo } : todo;
      //     });
      //     return updatedTodos;
      //   });
      setNewTodo("");
      setShowPop(false);
    } else {
      alert("유효하지 않은 입력");
    }
  };

  const handleClose = (event: React.MouseEvent) => {
    if (
      event.target instanceof HTMLElement &&
      (event.target.id === "overlay" || event.target.id === "cancel")
    ) {
      setShowPop(false);
      setNewTodo("");
    }
  };

  return (
    <>
      <Draggable draggableId={todoId + ""} index={index}>
        {(provided) => (
          <ToDoCard
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <input type="checkbox"></input>
            {todoText}
            <StyledPencil>
              <TiPencil onClick={onModify} />
            </StyledPencil>
            <StyledLuEraser>
              <LuEraser onClick={onDelete} />
            </StyledLuEraser>
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
                <button id="cancel" onClick={handleClose}>
                  취소
                </button>
              </div>
            </PopUp>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
}

export default React.memo(DraggableToDo);

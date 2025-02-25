import React, { useCallback, useMemo, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { todoData } from "../../type";
import { TiPencil } from "react-icons/ti";
import { LuEraser } from "react-icons/lu";
import "./checkbox.css";
import "./modifyPopUp.style.css";

const ToDoCard = styled.div`
  width: 100%;
  height: 54px;
  opacity: 1;
  margin-bottom: 10px;
  color: black;
  box-sizing: border-box;
  flex-shrink: 0;
  display: grid;
  grid-template-columns: auto 60px;
  align-items: center;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 37px; /* 왼쪽 여백 */
    right: 0px; /* 오른쪽 여백 */
    bottom: 6px;
    height: 1px;
    border-bottom-color: black;
    border-bottom: solid 1px;
  }
`;

const TextWrapper = styled.div`
  display: grid;
  grid-template-columns: 30px 30px;
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
  grid-column: 1;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    transition: color 0.5s ease-in-out;
    color: #6495ed;
  }
  &:not(:hover) {
    transition: color 0.5s ease-in-out;
  }
  @media (max-width: 1920px) and (max-height: 1080px) {
    width: 16px;
    height: 16px;
    margin-left: 14px;
    margin-top: 14px;
  }
`;

const StyledLuEraser = styled.div`
  grid-column: 2;
  width: 30px;
  height: 30px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  &:hover {
    transition: color 0.5s ease-in-out;
    color: #6495ed;
  }
  &:not(:hover) {
    transition: color 0.5s ease-in-out;
  }
  @media (max-width: 1920px) and (max-height: 1080px) {
    width: 16px;
    height: 16px;
    margin-left: 10px;
    margin-top: 14px;
  }
`;

const CheckBoxWrapper = styled.div`
  grid-column: 1;
  display: flex;
  align-items: center;
  width: 100%;
`;

const ToDoCardCheckbox = styled.input``;

const CheckStyle = styled.svg`
  width: 20px;
  height: 20px;
  @media (max-width: 1920px) and (max-height: 1080px) {
    width: 15px;
    height: 15px;
  }
`;

const ToDoTextWrapper = styled.div<{ isDone: boolean }>`
  line-height: 30px;
  text-decoration: ${(props) => (props.isDone ? "line-through" : "none")};
  color: ${(props) => (props.isDone ? "#c8ccd4;;" : "black")};
`;

const MainLabel = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SubLabel = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
`;

interface IDragabbleCardProps {
  todoId: number;
  todoText: string;
  todoIsDone: boolean;
  index: number;
  setTodoDataArray: React.Dispatch<React.SetStateAction<todoData[]>>;
}

function DraggableToDo({
  todoId,
  todoText,
  todoIsDone,
  index,
  setTodoDataArray,
}: IDragabbleCardProps) {
  // const setTodoState = useSetRecoilState(toDoState);
  const [showPop, setShowPop] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const onDelete = () => {
    setTodoDataArray((prevData) => {
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

  const handleClose = useCallback((event: React.MouseEvent) => {
    if (
      event.target instanceof HTMLElement &&
      (event.target.id === "overlay" || event.target.id === "cancel")
    ) {
      setShowPop(false);
      setNewTodo("");
    }
  }, []);
  //체크박스 바꾸는 핸들러
  const onChangeCheckBox = () => {
    setTodoDataArray((prevData) => {
      let updatedTodoDataArray = [...prevData];
      updatedTodoDataArray = updatedTodoDataArray.filter(
        (todoData: todoData) => {
          if (todoData.id == todoId) {
            todoData.isDone = todoIsDone ? false : true;
          }
          return todoData;
        }
      );
      return updatedTodoDataArray;
    });
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
            <CheckBoxWrapper className="checkbox-wrapper-52">
              <MainLabel htmlFor={`${Date.now()}`} className="item">
                <ToDoCardCheckbox
                  type="checkbox"
                  checked={todoIsDone}
                  onChange={onChangeCheckBox}
                  id={`${Date.now()}`}
                  className="hidden"
                />
                <SubLabel htmlFor={`${Date.now()}`} className="cbx">
                  <CheckStyle viewBox="0 0 14 12">
                    <polyline points="1 7.6 5 11 13 1"></polyline>
                  </CheckStyle>
                </SubLabel>
                <label
                  htmlFor={`${Date.now()}`}
                  className="cbx-lbl"
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: "500",
                  }}
                >
                  {todoText}
                </label>
              </MainLabel>
            </CheckBoxWrapper>
            <TextWrapper>
              <ToDoTextWrapper isDone={todoIsDone}></ToDoTextWrapper>
              <StyledPencil>
                <TiPencil onClick={onModify} />
              </StyledPencil>
              <StyledLuEraser>
                <LuEraser onClick={onDelete} />
              </StyledLuEraser>
            </TextWrapper>
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
            <PopUp className="edit-form">
              <input
                type="text"
                defaultValue={todoText}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="New Task"
                maxLength={30}
              />
              <div>
                <button onClick={handleSubmit}>Submit</button>
                <button id="cancel" onClick={handleClose}>
                  Cancel
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

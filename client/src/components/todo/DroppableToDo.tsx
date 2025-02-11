import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { CiSettings } from "react-icons/ci";
import DraggableToDo from "./DraggableToDo";
import { todoData } from "../../type";
import SettingPopup from "../Setting/SettingPopup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DefaultTheme } from "styled-components/dist/types";

const SettingButton = styled.form`
  grid-column: 3;
  grid-row: 1;
  margin-top: 20px;
  margin-right: 20px;
  display: flex;
  justify-content: flex-end;
  svg{
    cursor: pointer;
    font-size: 25px;
    color: #4b4b4b;
  }
  svg:hover{
    color: #000;
    transition: color 0.4s ease-in-out;
  }
  svg:not(:hover) {
    transition: color 0.4s ease-in-out;
  }
`;
const Form = styled.form`
  width: 100%;
  height: 100%;
  grid-column: 2;
  grid-row: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  div {
    font-size: 20px;
    font-weight: 400;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  border-bottom: 1px solid black;
  font-size: 18px;
  margin-left: 10px;
  padding-top: 10px;
  &:focus {
    outline: none;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  grid-column: 2;
  grid-row: 3;
  display: flex;
  justify-content: center;
`;
const ToDoList = styled.div`
  width: 100%;
  height: 322px;
  @media (max-width: 1920px) and (max-height: 1080px) {
    height: 266px;
  }
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    height: 20px;
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cee0de; /* 스크롤바 색상 */
    border-radius: 25px; /* 스크롤바 모서리 둥글게 */
  }
`;
const Title = styled.div`
  width: 100%;
  height: 100%;
  grid-column: 2;
  grid-row: 2;
  font-size: 40px;
  font-weight: 400;
`;
interface Props {
  todoDataArray: todoData[];
  setTodoDataArray: React.Dispatch<React.SetStateAction<todoData[]>>;
  updatingHandler: () => void;
  setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>;
}
interface todoForm {
  todoText: string;
}

function DroppableToDo({ todoDataArray, setTodoDataArray, setTheme }: Props) {
  const { register, setValue, handleSubmit } = useForm<todoForm>();
  const navigate = useNavigate();
  const [isShowSettingModal, setIsShowSettingModal] = useState(false);
  const createToDo = (data: todoForm) => {
    const { todoText } = data;
    const newTodoData: todoData = {
      id: Date.now(),
      text: todoText,
      isDone: false,
    };
    setTodoDataArray([...todoDataArray, newTodoData]);
    setValue("todoText", ""); // 입력필드 초기화
  };
  const onClose = () => {
    navigate("/");
    setIsShowSettingModal(false);
  };

  const onClick = () => {
    setIsShowSettingModal(true);
  };
  return (
    <>
      <SettingButton>
        <CiSettings onClick={() => onClick()} />
      </SettingButton>
      <Title>Todo List</Title>
      <Form onSubmit={handleSubmit(createToDo)}>
        <div>Add:</div>
        <Input
          {...register("todoText", { required: true })} // 폼 필드를 toDo라는 이름으로 등록, 유효성 검사
          type="text"
          placeholder=""
          maxLength={30}
        />
      </Form>
      <Wrapper>
        <Droppable droppableId="To Do">
          {(provided) => (
            <ToDoList ref={provided.innerRef} {...provided.droppableProps}>
              {todoDataArray.map((todo, index) => (
                <DraggableToDo
                  key={todo.id}
                  index={index}
                  todoId={todo.id}
                  todoText={todo.text}
                  todoIsDone={todo.isDone}
                  setTodoDataArray={setTodoDataArray}
                />
              ))}
              {provided.placeholder}
            </ToDoList>
          )}
        </Droppable>
      </Wrapper>
      {isShowSettingModal && <SettingPopup onClose={onClose} setTheme={setTheme} />}
    </>
  );
}

export default DroppableToDo;

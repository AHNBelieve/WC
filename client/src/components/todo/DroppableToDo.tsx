import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import DraggableToDo from "./DraggableToDo";
import { todoData } from "../../type";
const Form = styled.form`
  width: 100%;
  height: 100%;
  grid-column: 2;
  grid-row: 4;
  display: flex;
  justify-content: center;
  border: none;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  border-bottom: 1px solid black;
  font-size: 20px;
  margin-left: 50px;
  padding-top: 10px;
  &:focus{
    outline: none;
  }
  &::placeholder{
   font-weight: 300;
   color: #000;
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
  height: 310px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    height: 20px;
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #CEE0DE; /* 스크롤바 색상 */
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
}
interface todoForm {
  todoText: string;
}





function DroppableToDo({ todoDataArray, setTodoDataArray }: Props) {
  const { register, setValue, handleSubmit } = useForm<todoForm>();
  const createToDo = (data: todoForm) => {
    const { todoText } = data;
    const newTodoData: todoData = {
      id: Date.now(),
      text: todoText,
    };
    setTodoDataArray([...todoDataArray, newTodoData]);
    setValue("todoText", ""); // 입력필드 초기화
  };
  return (
    <>
      <Title>Todo List</Title>
      <Form onSubmit={handleSubmit(createToDo)}>
        <Input
          {...register("todoText", { required: true })} // 폼 필드를 toDo라는 이름으로 등록, 유효성 검사
          type="text"
          placeholder="Add:"
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
                  setTodoDataArray={setTodoDataArray}
                />
              ))}
              {provided.placeholder}
            </ToDoList>
          )}
        </Droppable>
      </Wrapper>
    </>
  );
}

export default DroppableToDo;

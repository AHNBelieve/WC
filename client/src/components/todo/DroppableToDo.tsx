import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import DraggableToDo from "./DraggableToDo";
import { todoData } from "../../type";
const Form = styled.form`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  border: none;
  grid-column: 1;
  grid-row: 1;
`;

const Input = styled.input`
  width: 70%;
  height: 100%;
  border: none;
  border-radius: 25px;
  background-color: white;
  text-align: center;
  font-size: 15px;
  &:focus{
    outline: none;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const ToDoList = styled.div`
  width: 80%;
  height: 200px;
  display: flex;
  flex-direction: column;
  grid-column: 1 / span 2;
  grid-row: 2;
  overflow: auto;
  margin-bottom: 20px;
  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    height: 20px;
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b8e0f5; /* 스크롤바 색상 */
    border-radius: 25px; /* 스크롤바 모서리 둥글게 */
  }
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
      <Form onSubmit={handleSubmit(createToDo)}>
        <Input
          {...register("todoText", { required: true })} // 폼 필드를 toDo라는 이름으로 등록, 유효성 검사
          type="text"
          placeholder="오늘 할 일"
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

import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import DraggableToDo from "./DraggableToDo";
import { todoData } from "../../type";

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  border: none;
  grid-column: 1 span 1;
  grid-row: 1 span 1;
`;

const ToDoList = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-column: 1;
  grid-row: 2;
  overflow: auto;
  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    height: 20px;
    width: 20px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ad9eff; /* 스크롤바 색상 */
    border-radius: 15px; /* 스크롤바 모서리 둥글게 */
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
        <input
          {...register("todoText", { required: true })} // 폼 필드를 toDo라는 이름으로 등록, 유효성 검사
          type="text"
          placeholder="오늘 할 일"
        />
      </Form>
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
    </>
  );
}

export default DroppableToDo;

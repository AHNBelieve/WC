import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { IToDo, toDoState } from "../../atoms";
import { useSetRecoilState } from "recoil";
import DraggableToDo from "./DraggableToDo";

const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    border: none;
    grid-column: 1 span 1;
    grid-row: 1 span 1;
`;

interface IForm {
    toDo: string;
}

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
        &::-webkit-scrollbar{
        height: 20px;
        width: 20px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ad9eff; /* 스크롤바 색상 */
        border-radius: 15px; /* 스크롤바 모서리 둥글게 */
    }
`;

interface IDroppableToDoProps {
    toDos: IToDo[];
}



function DroppableToDo({ toDos }: IDroppableToDoProps) {
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const setTodoState = useSetRecoilState(toDoState);
    const createToDo = ({ toDo }: IForm) => {
        const newToDo = {
            id: Date.now(),
            text: toDo,
        };
        setTodoState((prevState) => {
            return {
                ...prevState,    // 기존 상태 유지
                "To Do": [...toDos, newToDo], // 보드 이름을 "To Do"로 설정
            };
        });
        setValue("toDo", "");    // 입력필드 초기화
    };
    return (
        <>
            <Form onSubmit={handleSubmit(createToDo)}>
                <input
                    {...register("toDo", { required: true })}   // 폼 필드를 toDo라는 이름으로 등록, 유효성 검사
                    type="text"
                    placeholder="오늘 할 일"
                />
            </Form>
            <Droppable droppableId="To Do">
                {(provided) => (
                    <ToDoList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {toDos.map((todo, index) => (
                            <DraggableToDo
                                key={todo.id}
                                index={index}
                                toDoId={todo.id}
                                toDoText={todo.text}
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
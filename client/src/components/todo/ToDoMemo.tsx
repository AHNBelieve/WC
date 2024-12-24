import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { toDoState } from "../../atoms";

const MemoForm = styled.form`
    grid-column: 2;
    grid-row: 1 / span 2;
    display: grid;
    grid-template-rows: 40px 270px;
    gap: 5px;
    justify-items: center; /* 수평 가운데 정렬 */
`;

const Memo = styled.textarea`
    width: 100%;
    height: 100%;
    border-radius: 15px;
    grid-row:2;
    background-color: ${(props) => props.theme.boardColor};
    padding: 20px;
    color: white;
    resize: none;
    &:focus {
        outline: none;
    }
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

const MemoBTN = styled.button`
    grid-row: 1;
    width: 20%;
`;

interface IForm {
    memo: string;
}

function ToDoMemo() {
    const { register, handleSubmit } = useForm<IForm>();
    const [todoState, setTodoState] = useRecoilState(toDoState);
    const memoState = todoState["Memo"];
    const existingMemo = memoState?.length > 0 && memoState[0] ? memoState[0].text : "";    //메모 객체배열이 존재하면 text를 없다면 빈문자열
    const saveMemo = ({ memo }: IForm) => {
        const newMemo = {
            id: Date.now(),
            text: memo,
        };
        setTodoState((prevState) => {
            return {
                ...prevState, // 기존 상태 유지
                "Memo": [newMemo] // 기존 메모에 새 메모 덮어씌우기
            };
        });
    };
    return (
        <MemoForm onSubmit={handleSubmit(saveMemo)}>    {/* 폼 제출시 saveMemo함수 실행*/}
            <Memo
                {...register("memo", { required: true })}
                defaultValue={existingMemo} // 입력필드의 초기값
                placeholder="입력하세용"
            />
            <MemoBTN type="submit">제출</MemoBTN>
        </MemoForm>
    );
}

export default ToDoMemo;
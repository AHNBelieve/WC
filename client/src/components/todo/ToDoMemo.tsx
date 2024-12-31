import styled from "styled-components";

// const MemoForm = styled.form`
//   grid-column: 2;
//   grid-row: 1 / span 2;
//   display: grid;
//   grid-template-rows: 40px 270px;
//   gap: 5px;
//   justify-items: center; /* 수평 가운데 정렬 */
// `;

const Memo = styled.textarea`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  grid-row: 2;
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

// const MemoBTN = styled.button`
//   grid-row: 1;
//   width: 20%;
// `;
interface Props {
  memoData: string;
  setMemoData: React.Dispatch<React.SetStateAction<string>>;
}

function ToDoMemo({ memoData, setMemoData }: Props) {
  //   const { register, handleSubmit } = useForm<{ memo: string }>();
  //   const saveMemo = ({ memo }: { memo: string }) => {
  //     setMemoData(memo);
  //   };

  const onChangeMemoData = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemoData(e.target.value);
  };

  return (
    <Memo
      onChange={onChangeMemoData}
      defaultValue={memoData} // 입력필드의 초기값
      placeholder="입력하세용"
    />
  );
}

export default ToDoMemo;

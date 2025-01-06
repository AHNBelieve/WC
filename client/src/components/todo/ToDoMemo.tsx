import { motion } from "framer-motion";
import styled from "styled-components";

// const MemoForm = styled.form`
//   grid-column: 2;
//   grid-row: 1 / span 2;
//   display: grid;
//   grid-template-rows: 40px 270px;
//   gap: 5px;
//   justify-items: center; /* 수평 가운데 정렬 */
// `;

const MemoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Memo = styled(motion.textarea)`
  width: 80%;
  border-radius: 15px;
  background-color: #dae5f0;
  padding: 20px;
  color: black;
  font-weight: bold;
  font-size: 16px;
  resize: none;
  border: none;
  grid-column: 1 / span 2;
  grid-row: 3;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  &:focus {
    outline: none;
  }
  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b8e0f5; /* 스크롤바 색상 */
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
    <MemoWrapper>
      <Memo
        whileFocus={{ height: '250px' }}
        initial={{ height: '150px' }} // 초기 높이 설정
        transition={{ type: 'spring', stiffness: 50 }}
        onChange={onChangeMemoData}
        defaultValue={memoData} // 입력필드의 초기값
        placeholder="메모지"
      />
    </MemoWrapper>
  );
}

export default ToDoMemo;
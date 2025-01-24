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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1 / span 2;
  grid-row: 2;
`;

const Memo = styled(motion.textarea)`
  grid-column: 1 / span 2;
  grid-row: 3;
  width: 78%;
  height: 51.28%;
  margin-bottom: 30px;
  background-color: #dae5f0;
  padding: 20px;
  color: #000;
  font-size: 20px;
  resize: none;
  border: none;
  &:focus {
    outline: none;
  }
  &::placeholder{
   font-weight: bold;
  }
  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b8e0f5; /* 스크롤바 색상 */
    border-radius: 15px; /* 스크롤바 모서리 둥글게 */
  }
  background-attachment: local;
  line-height: 31px;
  padding: 6px 10px;
  background-image:
    linear-gradient(to right, white 10px, transparent 10px),
    linear-gradient(to left, white 10px, transparent 10px),
    repeating-linear-gradient(white, white 30px, #000 30px, #000 31px, white 31px);
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
        onChange={onChangeMemoData}
        defaultValue={memoData} // 입력필드의 초기값
        placeholder="Memo:"
      />
    </MemoWrapper>
  );
}

export default ToDoMemo;
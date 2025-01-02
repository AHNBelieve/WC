import styled from "styled-components";
import Calendar from "./components/calendar/Calendar";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import TodayInformation from "./components/TodayInformation";
import { useEffect, useState } from "react";
import { getToken } from "./supabase";

const Container = styled.div`
  width: 100vw;
  height: 200vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TodayInformationStyled = styled(TodayInformation)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 850px;
  height: 850px;
  padding: 10px;
  margin-top: 150px;
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 80px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px;
`;

const WrapperBottom = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 850px;
  height: 850px;
  padding: 10px;
  margin-top: 50px;
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 80px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px;
`;

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const initFun = async () => {
      const token = await getToken();
      if (!token) {
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
      setIsLoading(false); //이게 안에 있어야지 로그인이 1초라도 안 보인다.
    };
    initFun();
  });
  if (isLoading) {
    return <>로딩중...</>;
  }
  return (
    <>
      <Container>
        <TodayInformationStyled />
        {!isLogin ? <LoginComponent /> : null}
        {isLogin ? <Calendar /> : null}
      </Container>
    </>
  );
}

export default App;

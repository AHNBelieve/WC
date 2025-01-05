import styled from "styled-components";
import Calendar from "./components/calendar/Calendar";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import TodayInformation from "./components/TodayInformation";
import { useEffect, useState } from "react";
import { getToken } from "./supabase";

const Container = styled.div`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
`;

const TodayInformationSection = styled.div`
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
const CalendarSection = styled.div`
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const TodayInformationWrapper = styled.div`
  max-width: 1000px;
  max-height: 1200px;
  width: 60%;
  height: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 4fr 6fr;
  border-radius: 9% 9% 3% 3%;
  background-color: #d2e4fc;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
`;

const CalaendarWrapper = styled.div`
  max-width: 1000px;
  max-height: 1200px;
  width: 60%;
  height: 80%;
  border-radius: 9% 9% 3% 3%;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
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
        <TodayInformationSection>
          <TodayInformationWrapper>
            <TodayInformation />
          </TodayInformationWrapper>
        </TodayInformationSection>

        <CalendarSection>
          {!isLogin ? <LoginComponent /> : null}
          <CalaendarWrapper>{isLogin ? <Calendar /> : null}</CalaendarWrapper>
        </CalendarSection>
      </Container>
    </>
  );
}

export default App;

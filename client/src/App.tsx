import styled from "styled-components";
import Calendar from "./components/calendar/Calendar";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import TodayInformation from "./components/TodayInformation";
import React, { useEffect, useState } from "react";
import { getToken } from "./supabase";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
`;

const TodayInformationSection = styled.div`
  height: 100vh;
  width: 100vw;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f7fa;
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
  /*   @media (max-width: 3000px) and (max-height: 1500px) {
    width: 1000px;
    height: 1000px;
  }
  @media (max-width: 1300px) and (max-height: 1500px) {
    width: 700px;
    height: 700px;
  }
  @media (max-width: 1000px) {
    width: 300px;
    height: 300px;
  }   잠시대기*/
  width: 1000px;
  height: 1000px;
  @media (max-width: 2560px) and (max-height: 1440px) {
    /*         width: 1000px;
        height: 1000px; */
    width: 1000px;
    height: 1000px;
  }
  @media (max-width: 1920px) and (max-height: 1080px) {
    width: 800px;
    height: 800px;
  }
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 61fr 39fr;
  border-radius: 3%;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
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
        {isLogin ? (
          <TodayInformationSection>
            <TodayInformationWrapper>
              <TodayInformation />
            </TodayInformationWrapper>
          </TodayInformationSection>
        ) : null}
        <CalendarSection>
          {isLogin ? <Calendar /> : <LoginComponent />}
        </CalendarSection>
      </Container>
    </>
  );
}

export default React.memo(App);

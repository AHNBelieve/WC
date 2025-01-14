import styled from "styled-components";
import Calendar from "./components/calendar/Calendar";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import TodayInformation from "./components/TodayInformation";
import { useEffect, useState } from "react";
import { getToken, supabase } from "./supabase";

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
const LogoutButton = styled.button`
  position: absolute;
  top: 20px;
  right: 50px;
  padding: 15px 30px;
  background-color: #fd5129;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 22px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cb2801;
  }
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
  const onClickLogoutHandler = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      console.log("로그아웃 성공");
      window.location.reload();
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };
  if (isLoading) {
    return <>로딩중...</>;
  }

  return (
    <>
      <Container>
        {isLogin ? (
          <LogoutButton onClick={onClickLogoutHandler}>로그아웃</LogoutButton>
        ) : null}
        <TodayInformationSection>
          <TodayInformationWrapper>
            <TodayInformation />
          </TodayInformationWrapper>
        </TodayInformationSection>
        <CalendarSection>
          {isLogin ? (
            <CalaendarWrapper>
              <Calendar />
            </CalaendarWrapper>
          ) : (
            <LoginComponent />
          )}
        </CalendarSection>
      </Container>
    </>
  );
}

export default App;

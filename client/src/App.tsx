import styled from "styled-components";
import Weather from "./components/weather/Weather";
import ToDo from "./components/todo/ToDo";
import Profile from "./components/profile/Profile";
import Calendar from "./components/calendar/Calendar";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  `;

const WrapperRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 43%;
  height: 90%;
  padding: 10px;
`;

const WrapperLeft = styled(WrapperRight)`
  border-radius: 80px;
  background-color: ${(props) => props.theme.boxColor};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px;
`;

const WeatherBoard = styled.div`
  border-radius: 56px;
  width: 92%;
  height: 47%;
  background-color: ${(props) => props.theme.boardColor};
`;

const ToDoBoard = styled.div`
  border-radius: 56px;
  width: 92%;
  height: 42%;
  background-color: ${(props) => props.theme.boardColor};
`;



function App() {
  return (
    <>
      <Container>
        <WrapperLeft>
          <WeatherBoard>
            <Weather />
          </WeatherBoard>
          <ToDoBoard>
            <ToDo />
          </ToDoBoard>
        </WrapperLeft>
        <WrapperRight>
          <Profile />
          <Calendar />
        </WrapperRight>
      </Container>
    </>
  )
}

export default App;

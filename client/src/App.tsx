import styled from "styled-components";
import Weather from "./components/weather/Weather";
import ToDo from "./components/todo/ToDo";
import Calendar from "./components/calendar/Calendar";

const Container = styled.div`
  width: 100vw;
  height: 200vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  `;

const TodayInformation = styled.div`
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
        <TodayInformation>
          <WeatherBoard>
            <Weather />
          </WeatherBoard>
          <ToDoBoard>
            <ToDo />
          </ToDoBoard>
        </TodayInformation>
        <WrapperBottom>
          <Calendar />
        </WrapperBottom>
      </Container>
    </>
  )
}

export default App;

import { useState } from "react";
import Calendars from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일 추가
import styled from "styled-components";

const CalendarBoard = styled.div`
  border-radius: 56px;
  width: 92%;
  height: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCalendar = styled(Calendars)`
  height: 100%;
  width: 100%;
  padding: 20px;
  border: none;
  border-radius: 56px;
  background-color: ${(props) => props.theme.boxColor};
  opacity: 100% ;
.react-calendar__month-view {
    abbr {
      font-size: 1.3em;
      color: ${(props) => props.theme.lighter};
    }
  }
  .react-calendar__navigation {
    justify-content: center;
    button{
      border-radius: 50px;
      color: white;
      font-size: 1.4em;
      background-color: ${(props) => props.theme.bgColor};
    }
  }
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }
  .react-calendar__navigation button:hover,
  .react-calendar__navigation button:focus {
    background-color: ${(props) => props.theme.bgColor};;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: ${(props) => props.theme.bgColor};
    border-radius: 50px;
  }
  .react-calendar__month-view__days__day {
    height: 70px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
}
.react-calendar__tile--now {
    background-color: white; 
    border-radius: 50px;
    abbr{
    color: black; 
    }
}
`;

function Calendar() {
  const [date, setDate] = useState(new Date());
  const onChange = (newDate: any) => {
    setDate(newDate);
  };

  return (
    <CalendarBoard>
      <StyledCalendar
        onChange={onChange}
        value={date}
      />
    </CalendarBoard>
  );
}

export default Calendar;
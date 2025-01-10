import { useState } from "react";
import Calendars from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 스타일 추가
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CalendarBoard = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 2;
  grid-row: 1 / span 3;
  border-radius: 9% 9% 3% 3%;
`;

const StyledCalendar = styled(Calendars)`
  width: 100%;
  height: 100%;
  padding: 20px;
  border: none;
  border-radius: 56px;
  border-radius: 9% 9% 3% 3%;
  opacity: 100%; 
  background-color: #d2e4fc;
 .react-calendar__month-view {
    abbr {
      font-size: 1.3em;
      color: black;
    }
  }
  .react-calendar__navigation {
    justify-content: center;
    button {
      border-radius: 50px;
      color: black;
      font-size: 1.4em;
    }
  }
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }
  .react-calendar__navigation button:hover,
  .react-calendar__navigation button:focus {
    background-color: ${(props) => props.theme.bgColor};
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: ${(props) => props.theme.bgColor};
    border-radius: 50px;
  }
  .react-calendar__month-view__days__day {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .react-calendar__tile--now {
    background-color: white;
    border-radius: 50px;
    abbr {
      color: black;
    }
  } 
`;


function Calendar() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const onChange = (newDate: any) => {
    setDate(newDate);
    const dateId: string = newDate.toString().split(" ").slice(0, 4).join(" ")
    navigate(`/date/${dateId}`);
  };

  return (
    <CalendarBoard>
      <StyledCalendar onChange={onChange} value={date} />
    </CalendarBoard>
  );
}

export default Calendar;

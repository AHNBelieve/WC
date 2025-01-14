import { useState, useEffect } from "react";
import { Calendar as Calendars } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.styles.css";
import { useNavigate } from "react-router-dom";
import { getMonthlyDailyData } from "../../api/dailyData";
import type { OnArgs } from "react-calendar/dist/cjs/shared/types.d.ts";
import { Value } from "react-calendar/dist/cjs/shared/types.d.ts";

function Calendar() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date());
  const [writtenDates, setWrittenDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchWrittenDates = async () => {
      const dates = await getMonthlyDailyData(date);
      setWrittenDates(dates);
      setIsLoading(false);
    };
    fetchWrittenDates();
  }, [date]);

  const onChange = (value: Value) => {
    if (value instanceof Date) {
      const dateString = new Date(
        value.getTime() - value.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      if (writtenDates.includes(dateString)) {
        setDate(value);
        navigate(`/date/${dateString}`);
      }
    }
  };

  const onActiveStartDateChange = (args: OnArgs) => {
    if (args.activeStartDate) {
      setDate(args.activeStartDate);
    }
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const dateString = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];
    return writtenDates.includes(dateString) ? "written-date" : null;
  };
  const tileDisabled = ({ date }: { date: Date }) => {
    const dateString = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    return !writtenDates.includes(dateString);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="calendar-board">
      <Calendars
        onChange={onChange}
        value={date}
        tileClassName={tileClassName}
        tileDisabled={tileDisabled}
        onActiveStartDateChange={onActiveStartDateChange}
        className="custom-calendar"
      />
    </div>
  );
}

export default Calendar;

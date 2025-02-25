import React, { useState, useEffect, useCallback, useRef } from "react";
import { Calendar as Calendars } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.styles.css";
import { useNavigate } from "react-router-dom";
import { getMonthlyDailyData } from "../../api/dailyData";
import type { OnArgs } from "react-calendar/dist/cjs/shared/types.d.ts";
import type { Value } from "react-calendar/dist/cjs/shared/types.d.ts";
import Past from "../router/Past";

function Calendar() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date());
  const [writtenDates, setWrittenDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPastModal, setShowPastModal] = useState(false);
  const [dateId, setDateId] = useState("");
  const calendarRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setIsLoading(true);
    if (window.location.pathname.includes("/date")) {
      setDateId(window.location.pathname.split("/")[2]);
      navigate(`/date/${window.location.pathname.split("/")[2]}`);
      setShowPastModal(true);
      setTimeout(() => {
        if (calendarRef.current) {
          calendarRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 300);
    }

    const fetchWrittenDates = async () => {
      const dates = await getMonthlyDailyData(date);
      setWrittenDates(dates);
      setIsLoading(false);
    };
    fetchWrittenDates();
  }, [date]);

  const onChange = (value: Value) => {
    console.log(value);
    if (value instanceof Date) {
      const dateString = new Date(
        value.getTime() - value.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      if (writtenDates.includes(dateString)) {
        setDateId(dateString);
        navigate(`/date/${dateString}`);
        setShowPastModal(true);
      }
    }
  };

  const onActiveStartDateChange = (args: OnArgs) => {
    console.log(args.activeStartDate);
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
    return (
      <div className="calendar-board">
        <div className="calendar-loading">
          <div className="loading-spinner"></div>
          <span>Loading calendar...</span>
        </div>
      </div>
    );
  }

  const onClose = () => {
    navigate("/");
    setShowPastModal(false);
  };

  return (
    <div className="calendar-board" ref={calendarRef}>
      <Calendars
        onChange={onChange}
        value={date}
        tileClassName={tileClassName}
        tileDisabled={tileDisabled}
        onActiveStartDateChange={onActiveStartDateChange}
        className="custom-calendar"
      />
      {showPastModal && <Past dateId={dateId} onClose={onClose} />}
    </div>
  );
}

export default React.memo(Calendar);

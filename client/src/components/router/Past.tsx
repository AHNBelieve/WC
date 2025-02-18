import React, { useEffect, useState } from "react";
import { getDailyData } from "../../api/dailyData";
import { todoData, weatherDataToSave } from "../../type";
import "./Past.styles.css";
import { useNavigate } from "react-router-dom";

interface PastProps {
  onClose: () => void;
  dateId: string;
}
interface responseData {
  created_at: string;
  date: string;
  id: number;
  memoData: string;
  todoData: todoData[];
  weatherData: weatherDataToSave;
}

function Past({ onClose, dateId }: PastProps) {
  const [data, setData] = useState<responseData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        const dailyData = await getDailyData(dateId);
        setData(dailyData);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [dateId]);
  const onCloseHandler = () => {
    onClose();
    setData(undefined);
  };
  if (isLoading)
    return (
      <div className="past-overlay" onClick={onCloseHandler}>
        <div className="past-box">
          <div className="past-loading">로딩중입니다...</div>
        </div>
      </div>
    );
  if (isError)
    return (
      <div className="past-overlay" onClick={onCloseHandler}>
        <div className="past-box">
          <div className="past-error">데이터를 불러오는데 실패했습니다.</div>
        </div>
      </div>
    );
  if (!data) return null;

  return (
    <div className="past-overlay" onClick={onCloseHandler}>
      <div className="past-box" onClick={(e) => e.stopPropagation()}>
        <div className="past-container">
          <div className="past-header">
            <h2>{data.date}</h2>
            <button className="past-close-button" onClick={onCloseHandler}>
              ✕
            </button>
          </div>

          <div className="past-section">
            <h3>날씨 정보</h3>
            <div className="past-weather-info">
              <div className="past-weather-location">
                📍 {data.weatherData.name}
              </div>
              <div className="past-weather-temps">
                <div className="past-weather-temp high">
                  <span>🌡️</span>
                  <span>최고 {data.weatherData.temp_max}°C</span>
                </div>
                <div className="past-weather-temp low">
                  <span>🌡️</span>
                  <span>최저 {data.weatherData.temp_min}°C</span>
                </div>
              </div>
            </div>
          </div>

          <div className="past-section">
            <h3>할 일 목록</h3>
            <div className="past-todo-list">
              {data.todoData.map((todo) => (
                <div key={todo.id} className="past-todo-item">
                  {todo.isDone ? "✅" : "⬜"}
                  <span
                    style={{
                      textDecoration: todo.isDone ? "line-through" : "none",
                    }}
                  >
                    {todo.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="past-section">
            <h3>메모</h3>
            <div className="past-memo-content">
              {data.memoData || "메모가 없습니다."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Past);

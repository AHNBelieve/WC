import "./WeatherPopUp.styles.css";
import WeatherChart from "./WeatherChart";
import { WeathersResponse } from "../../type";
import styled from "styled-components";
import { renderIcon } from "./utils/renderIcon";
import { getCountryName } from "./WeatherApi";
import { useEffect, useState } from "react";
import React from "react";

interface WeatherPopUpProp {
  onClose: () => void;
  weatherData: WeathersResponse | null;
}

const PopUpBox = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
`;

function WeatherPopUp({ onClose, weatherData }: WeatherPopUpProp) {
  const [currentTime, setCurrentTime] = useState<string>("");
  if (!weatherData) return null;

  // Unix 타임스탬프를 a.m./p.m. 형식으로 변환하는 함수
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // 밀리초로 변환
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // 가시거리 기준
  const visibilityStandard = () => {
    const visibility = weatherData.visibility / 1000;
    if (visibility >= 10) {
      return <div>Very Good!😊</div>;
    } else if (visibility >= 5 && visibility < 10) {
      return <div>Average😐</div>;
    } else if (visibility >= 1 && visibility < 5) {
      return <div>Bad😥</div>;
    } else if (visibility < 1) {
      return <div>Very Bad😭</div>;
    }
  };
  // 기압압 기준
  const PressureStandard = () => {
    const pressure = weatherData.main.pressure;
    if (pressure >= 1020) {
      // 고기압
      return <div>High Pressure</div>;
    } else if (pressure >= 1000 && pressure < 1020) {
      // 중기압
      return <div>Mid Pressure</div>;
    } else if (pressure < 1000) {
      // 저기압
      return <div>Low Pressure</div>;
    }
  };

  //현재 시간
  const formatCurrentTime = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return now.toLocaleString("en-US", options);
  };

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(formatCurrentTime());
    };

    // 처음 렌더링 시 시간 설정
    updateTime();

    // 1분마다 시간 업데이트
    const interval = setInterval(updateTime, 60000);

    // 컴포넌트 언마운트 시 interval 정리
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <PopUpBox className="popup-box" onClick={(e) => e.stopPropagation()}>
        <WeatherChart />
        {/*날씨 카드*/}
        <div className="weather-card-top">
          {renderIcon(weatherData?.weather[0].id)}
          <div className="weather-card-bottom">
            <div>
              {weatherData?.main.temp.toFixed(1)}
              <sup>°C</sup>
            </div>
            <div>{currentTime}</div>
            <div>{weatherData.weather[0].description}</div>
            <div>
              {weatherData?.name}, {getCountryName(weatherData?.sys.country)}
            </div>
          </div>
        </div>
        <div className="detail-weather">
          {/* 체감 온도 */}
          <div>
            <div className="Title">Feels like</div>
            <div className="feels_like">
              {weatherData.main.feels_like}
              <sup>°C</sup>
            </div>
          </div>
          {/* 습도 */}
          <div>
            <div className="Title">Humidity</div>
            <div className="humidity">
              <img src="/humidity.png" alt="Humidity" />
              {weatherData.main.humidity}
              <span>%</span>
            </div>
          </div>
          {/* 풍속 */}
          <div>
            <div className="Title">Wind Status</div>
            <div className="wind_speed">
              <img src="/wind_status.png" alt="Wind Status" />
              {weatherData.wind.speed}m/s
            </div>
          </div>
          {/* 가시 거리 */}
          <div>
            <div className="Title">Visibility</div>
            <div className="visibility">
              <div>
                {weatherData.visibility / 1000}
                <span>km</span>
              </div>
              {visibilityStandard()}
            </div>
          </div>
          {/* 기압 */}
          <div>
            <div className="Title">Pressure</div>
            <div className="pressure">
              <div>
                {weatherData.main.pressure}
                <span>hpa</span>
              </div>
              {PressureStandard()}
            </div>
          </div>
          {/* 일출, 일몰 */}
          <div>
            <div className="Title">Sunrise & Sunset</div>
            <div className="sunrise_sunset">
              <div>
                <img src="/sunrise.png" alt="Sunrise" />
                {formatTime(weatherData.sys.sunrise)}
              </div>
              <div>
                <img src="/sunset.png" alt="Sunset" />
                {formatTime(weatherData.sys.sunset)}
              </div>
            </div>
          </div>
        </div>
      </PopUpBox>
    </div>
  );
}

export default React.memo(WeatherPopUp);

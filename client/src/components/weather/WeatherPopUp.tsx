import "./WeatherPopUp.styles.css";
import WeatherChart from "./WeatherChart";
import { WeathersResponse } from "../../type";
import styled from "styled-components";

interface WeatherPopUpProp {
  onClose: () => void;
  WeatherData: WeathersResponse | null;
}

const PopUpBox = styled.div`
background-color: ${({ theme }) => theme.bgColor};
`;

function WeatherPopUp({ onClose, WeatherData }: WeatherPopUpProp) {
  if (!WeatherData) return null;

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
    const visibility = WeatherData.visibility / 1000;
    if (visibility >= 10) {
      return <div>Very Good!😊</div>;
    } else if (visibility >= 5 && visibility < 10) {
      return <div>Average😐</div>;
    } else if (visibility >= 1 && visibility < 5) {
      return <div>Bad😥</div>;
    } else if (visibility < 1) {
      return <div>Very Bad😭</div>;
    }
  }
  // 기압압 기준
  const PressureStandard = () => {
    const pressure = WeatherData.main.pressure;
    if (pressure >= 1020) { // 고기압
      return <div>High Pressure</div>;
    } else if (pressure >= 1000 && pressure < 1020) {  // 중기압
      return <div>Mid Pressure</div>;
    } else if (pressure < 1000) { // 저기압
      return <div>Low Pressure</div>;
    }
  }

  return (
    <div className="popup-overlay" onClick={onClose}>
      <PopUpBox className="popup-box" onClick={(e) => e.stopPropagation()}>
        <div className="weather-card" />
        <WeatherChart />
        <div className="detail-weather">
          {/* 체감 온도 */}
          <div>
            <div className="Title">Feels like</div>
            <div className="feels_like">
              {WeatherData.main.feels_like}
              <sup>°C</sup>
            </div>
          </div>
          {/* 습도 */}
          <div>
            <div className="Title">Humidity</div>
            <div className="humidity">
              <img src="/humidity.png" alt="Humidity" />
              {WeatherData.main.humidity}<span>%</span>
            </div>
          </div>
          {/* 풍속 */}
          <div>
            <div className="Title">Wind Status</div>
            <div className="wind_speed">
              <img src="/wind_status.png" alt="Wind Status" />
              {WeatherData.wind.speed}m/s
            </div>
          </div>
          {/* 가시 거리 */}
          <div>
            <div className="Title">Visibility</div>
            <div className="visibility">
              <div>{WeatherData.visibility / 1000}<span>km</span></div>
              {visibilityStandard()}
            </div>
          </div>
          {/* 기압 */}
          <div>
            <div className="Title">Pressure</div>
            <div className="pressure">
              <div>{WeatherData.main.pressure}<span>hpa</span></div>
              {PressureStandard()}
            </div>
          </div>
          {/* 일출, 일몰 */}
          <div>
            <div className="Title">Sunrise & Sunset</div>
            <div className="sunrise_sunset">
              <div>
                <img src="/sunrise.png" alt="Sunrise" />
                {formatTime(WeatherData.sys.sunrise)}
              </div>
              <div>
                <img src="/sunset.png" alt="Sunset" />
                {formatTime(WeatherData.sys.sunset)}
              </div>
            </div>
          </div>
        </div>
      </PopUpBox>
    </div>
  );
}

export default WeatherPopUp;

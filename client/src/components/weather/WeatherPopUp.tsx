import "./WeatherPopUp.styles.css";
import WeatherChart from "./WeatherChart";
import { WeathersResponse } from "../../type";

interface WeatherPopUpProp {
  onClose: () => void;
  WeatherData: WeathersResponse | null;
}

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

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <div className="weather-card" />

        <WeatherChart />
        <div className="detail-weather">
          {/* 체감 온도 */}
          <div>
            <div className="Title">Feels_like</div>
            <div className="feels_like">
              {WeatherData.main.feels_like}
              <sup>°C</sup>
            </div>
          </div>
          {/* 습도 */}
          <div>
            <div className="Title">Humidity</div>
            <div className="humidity">{WeatherData.main.humidity}%</div>
          </div>
          {/* 풍속 */}
          <div>
            <div className="Title">Wind Status</div>
            <div className="wind_speed">{WeatherData.wind.speed}m/s</div>
          </div>
          {/* 가시 거리 */}
          <div>
            <div className="Title">Visibility</div>
            <div className="visibility">{WeatherData.visibility / 1000}km</div>
          </div>
          {/* 기압 */}
          <div>
            <div className="Title">Pressure</div>
            <div className="pressure">{WeatherData.main.pressure}hpa</div>
          </div>
          {/* 일출, 일몰 */}
          <div>
            <div className="Title">Sunrise & Sunset</div>
            <div className="sunrise_sunset">
              {formatTime(WeatherData.sys.sunrise)} <br />
              {formatTime(WeatherData.sys.sunset)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherPopUp;

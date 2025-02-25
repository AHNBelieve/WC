import style from "./css/WeatherMain.module.css"
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { WeathersResponse, weatherDataToSave } from "../../type";
import { fetchWeatherData, getLocation } from "../../api/weatherData";
import { FaChevronRight } from "react-icons/fa6";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import WeatherPopUp from "./WeatherPopUp";
import { useNavigate } from "react-router-dom";
import { renderIcon } from "./utils/renderIcon";
import { Loading } from "../../App";
countries.registerLocale(en);
export const getCountryName = (code: string | undefined) => {
  if (!code) return "Unknown Country";
  return countries.getName(code, "en") || "Unknown Country";
};

const WeatherCard = styled.div`
  background-color: ${({ theme }) => theme.cardColor};
`;

interface Props {
  setWeatherDataToSave: React.Dispatch<
    React.SetStateAction<weatherDataToSave | object>
  >;
}

function WeatherMain({ setWeatherDataToSave }: Props) {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState<WeathersResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showWeatherModal, setshowweatherModal] = useState(false);
  useEffect(() => {
    const getWeather = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const location = await getLocation();
        const data = await fetchWeatherData(location.lat, location.lon);
        setWeatherData(data);
        setWeatherDataToSave({
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          id: data.id,
          name: data.name,
        });
      } catch (err) {
        console.log(err);
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    getWeather();
  }, []);

  if (isLoading) {
    return <Loading />;;
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  const onClose = () => {
    navigate("/");
    setshowweatherModal(false);
  };

  const onClick = () => {
    setshowweatherModal(true);
  };
  return (
    <>
      <div className={style.container}>
        <WeatherCard className={style.card}>
          <div className={style.icon}>
            {renderIcon(weatherData?.weather[0].id)}  {/* 날씨 아이콘 */}
          </div>
          <div className={style.temp}>
            <div>
              {weatherData?.main.temp.toFixed(1)}
              <sup>°C</sup>
            </div>
            <div>
              {weatherData?.name}, {getCountryName(weatherData?.sys.country)}
            </div>
          </div>
          <button className={style.button} onClick={onClick}>
            see more
            <FaChevronRight />
          </button>
        </WeatherCard>
      </div>
      {showWeatherModal && (
        <WeatherPopUp onClose={onClose} weatherData={weatherData} />
      )}
    </>
  );
}

export default React.memo(WeatherMain);

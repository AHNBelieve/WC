import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { WeathersResponse, weatherDataToSave } from "../../type";
import { fetchWeatherData, getLocation } from "../../api/weatherData";
import { FaChevronRight } from "react-icons/fa6";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import WeatherPopUp from "./WeatherPopUp";
import { useNavigate } from "react-router-dom";
countries.registerLocale(en);
const getCountryName = (code: string | undefined) => {
  if (!code) return "Unknown Country";
  return countries.getName(code, "en") || "Unknown Country";
};

const Icon = styled.div`
  grid-column: 1;
  grid-row: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  user-select: none;
  img {
    width: 148px;
    height: 136px;
    @media (max-width: 1920px) and (max-height: 1080px) {
      width: 130px;
      height: 120px;
    }
  }
`;

const WeatherCardWrapper = styled.div`
  grid-column: 1;
  grid-row: 1;
  display: grid;
  grid-template-columns: 11fr 36fr 3fr;
  grid-template-rows: 11fr 50fr;
`;
const WeatherCard = styled.div`
  grid-column: 2;
  grid-row: 2;
  width: 100%;
  height: 100%;
  background-color: #c8d4e3;
  border-radius: 50px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 15fr 21fr 14fr;
`;

const Temp = styled.div`
  grid-column: 1;
  grid-row: 2;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 17fr 4fr;

  div:nth-child(1) {
    grid-column: 1;
    grid-row: 1;
    display: flex;
    justify-content: center;
    margin: 0;
    font-size: 120px;
    text-align: center;
    @media (max-width: 1920px) and (max-height: 1080px) {
      font-size: 100px;
    }
  }
  div:nth-child(1) sup {
    font-size: 0.25em;
    vertical-align: super;
  }

  div:nth-child(2) {
    font-size: 30px;
    @media (max-width: 1920px) and (max-height: 1080px) {
      font-size: 25px;
    }
    font-weight: 500;
    grid-column: 1;
    grid-row: 2;
    display: flex;
    justify-content: center;
  }
`;

const MoreBTN = styled.button`
  grid-column: 1;
  grid-row: 3;
  background-color: transparent;
  border-radius: 0 0 50px 50px;
  border: none;
  width: 96%;
  height: 30%;
  align-self: end;
  justify-self: center;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  color: #7a7a7a;
  @media (max-width: 1920px) and (max-height: 1080px) {
    font-size: 12px;
  }
  &:hover {
    transition: color 0.3s ease-in-out;
    color: #000; /* Hover 시 텍스트 색 변경 */
  }
  &:not(:hover) {
    transition: color 0.3s ease-in-out; /* 원래 색으로 돌아갈 때 속도 변경 */
  }
`;

interface Props {
  setWeatherDataToSave: React.Dispatch<
    React.SetStateAction<weatherDataToSave | object>
  >;
}

function WeatherAPI({ setWeatherDataToSave }: Props) {
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
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }
  const renderIcon = () => {
    const Id = weatherData?.weather[0].id;
    if (Id) {
      if (Id === 800) {
        return <img src="/day_clear.svg" alt="Day Clear Icon" />;
      } else if (Id >= 200 && Id <= 232) {
        return <img src="/rain_thunder.svg" alt="Rain Thunder Icon" />;
      } else if (Id >= 300 && Id <= 321) {
        return <img src="/rain.svg" alt="Rain Icon" />;
      } else if (Id >= 500 && Id <= 531) {
        return <img src="/rain.svg" alt="Rain Icon" />;
      } else if (Id >= 600 && Id <= 622) {
        return <img src="/snow.svg" alt="Snow Icon" />;
      } else if (Id >= 700 && Id <= 781) {
        return <img src="/fog.svg" alt="Fog Icon" />;
      } else if (Id >= 801 && Id <= 804) {
        return <img src="/cloudy.svg" alt="Cloudy Icon" />;
      }
    }
    return null;
  };
  const onClose = () => {
    navigate("/");
    setshowweatherModal(false);
  };

  const onClick = () => {
    setshowweatherModal(true);
  };
  return (
    <>
      {/* <Name>
        <div>{weatherData?.name}</div>
      </Name> */}
      <WeatherCardWrapper>
        <WeatherCard>
          <Icon>
            {/* {renderIcon()} */}
            <img src="weather.png" alt="Day Clear Icon" />
          </Icon>
          <Temp>
            <div>
              {weatherData?.main.temp.toFixed(1)}
              <sup>°C</sup>
            </div>
            <div>
              {weatherData?.name}, {getCountryName(weatherData?.sys.country)}
            </div>
          </Temp>
          <MoreBTN onClick={onClick}>
            see more
            <FaChevronRight />
          </MoreBTN>
        </WeatherCard>
      </WeatherCardWrapper>
      {showWeatherModal && (
        <WeatherPopUp onClose={onClose} WeatherData={weatherData} />
      )}
    </>
  );
}

export default React.memo(WeatherAPI);

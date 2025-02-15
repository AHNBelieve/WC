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
countries.registerLocale(en);
export const getCountryName = (code: string | undefined) => {
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
    width: 136px;
    height: 136px;
    @media (max-width: 1920px) and (max-height: 1080px) {
      width: 110px;
      height: 110px;
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
  background-color: ${({ theme }) => theme.cardColor};
  border-radius: 50px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 15fr 21fr 14fr;
  font-Family: Roboto sans-serif;
  font-Weight: 500; 
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
    font-Family: Roboto sans-serif;
    font-Weight: 500; 
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
  font-Family: Roboto sans-serif;
  font-Weight: 500; 
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
            {renderIcon(weatherData?.weather[0].id)}
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
        <WeatherPopUp onClose={onClose} weatherData={weatherData} />
      )}
    </>
  );
}

export default React.memo(WeatherAPI);

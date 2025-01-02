import { useEffect, useState } from "react";
import styled from "styled-components";
import { WeathersResponse, weatherDataToSave } from "../../type";
import { fetchWeatherData } from "../../api/weatherData";

const WeatherBoard = styled.div`
  border-radius: 56px;
  width: 92%;
  height: 47%;
  background-color: ${(props) => props.theme.boardColor};
  display: grid;
  grid-template-columns: 465px 300px;
  grid-template-rows: 1fr;
`;

const MainWeather = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 280px 185px;
  grid-template-rows: 110px auto;
`;

const Name = styled.div`
  grid-column: 1 / span 2;
  grid-row: 1;
  div {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 80px;
    font-size: 50px;
  }
`;
const Temp = styled.div`
  grid-column: 2;
  grid-row: 2;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 120px;

  div:first-child {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-size: 60px;
  }
  div:last-child {
    display: flex;
    justify-content: center;
    font-size: 20px;
  }
`;
const Icon = styled.div`
  grid-column: 1;
  grid-row: 2;
  img {
    width: 100%;
    height: 100%;
  }
`;

const SubWeather = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.7fr 1fr 1fr;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div {
      margin-top: 10px;
    }
  }
  div:nth-child(1) {
    grid-column: 1;
    grid-row: 2;
  }
  div:nth-child(2) {
    grid-column: 1;
    grid-row: 3;
  }
  div:nth-child(3) {
    grid-column: 2;
    grid-row: 3;
  }
  div:nth-child(4) {
    grid-column: 2;
    grid-row: 2;
  }
`;
interface Props {
  setWeatherDataToSave: React.Dispatch<
    React.SetStateAction<weatherDataToSave | null>
  >;
}

function WeatherAPI({ setWeatherDataToSave }: Props) {
  const [weatherData, setWeatherData] = useState<WeathersResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //애초에 geolocation이 비동기적으로 작동하는데 async를 적용할 수 없어서 그냥 Promise안에 가둬버렸다!
  const getLocation = (): Promise<{ lat: number; lon: number }> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            resolve({ lat, lon });
          },
          (error) => {
            reject(`에러 코드: ${error.code}, 메시지: ${error.message}`);
          }
        );
      } else {
        reject("이 브라우저는 Geolocation을 지원하지 않습니다.");
      }
    });
  };
  useEffect(() => {
    const getWeather = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const location = await getLocation(); // 위치를 받아옴
        const data = await fetchWeatherData(location.lat, location.lon);
        setWeatherData(data);
        setWeatherDataToSave({
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          id: data.id,
          name: data.name,
        });
      } catch (err) {
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

  return (
    <WeatherBoard>
      <MainWeather>
        <Name>
          <div>{weatherData?.name}</div>
        </Name>
        <Temp>
          <div>{weatherData?.main.temp}°</div>
          <div>{weatherData?.weather[0].description}</div>
        </Temp>
        <Icon>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
          />
        </Icon>
      </MainWeather>
      <SubWeather>
        <div>
          {weatherData?.main.temp_max}
          <div>최고기온</div>
        </div>
        <div>
          {weatherData?.main.temp_min}
          <div>최저기온</div>
        </div>
        <div>
          {weatherData?.main.pressure}hpa<div>기압</div>
        </div>
        <div>
          {weatherData?.main.humidity}%<div>습도</div>
        </div>
      </SubWeather>
    </WeatherBoard>
  );
}

export default WeatherAPI;

import { useEffect, useState } from "react";
import styled from "styled-components";
import { WeathersResponse, weatherDataToSave } from "../../type";
import { fetchWeatherData } from "../../api/weatherData";


const Icon = styled.div`
display: flex;
justify-content: center;
align-items: center;
user-select: none;
img{
  width: 400px;
  height: 400px;
}
  grid-column: 2;
  grid-row: 1;
`;

const Name = styled.div`
  grid-column: 1;
`;

const Temp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  grid-column: 1;
  grid-row: 1;
  div:last-child{
    font-size: 30px;
  }
`;

interface Props {
  setWeatherDataToSave: React.Dispatch<
    React.SetStateAction<weatherDataToSave | object>
  >;
}

function WeatherAPI({ setWeatherDataToSave }: Props) {
  const [weatherData, setWeatherData] = useState<WeathersResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //애초에 geolocation이 비동기적으로 작동하는데 async를 적용할 수 없어서 그냥 Promise안에 가둬버렸다!
  const getLocation = (): Promise<{ lat: number; lon: number }> => {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            resolve({ lat, lon });
          },
          () => {
            // 오류가 발생하면 서울의 위치(위도: 37.5665, 경도: 126.978) 반환
            resolve({ lat: 37.5665, lon: 126.978 });
          }
        );
      } else {
        // Geolocation이 지원되지 않는 경우에도 서울의 위치 반환
        resolve({ lat: 37.5665, lon: 126.978 });
      }
    });
  };
  //메인 로직으로, 우선 location받아오고, 이후에 따로 뺀 weather API를 호출한다.
  //보안을 위해서 API키는 환경변수로 뺐고, 타입도 빼줬다.
  //성공적으로 값을 가져오면 weatherData값과 저장할 weatherDataToSave를 저장한다.
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
    const Id = weatherData?.weather[0].id
    if (Id) {
      if (Id === 800) {
        return <img src="/day_clear.svg" alt="Day Clear Icon" />
      } else if (Id >= 200 && Id <= 232) {
        return <img src="/rain_thunder.svg" alt="Rain Thunder Icon" />
      } else if (Id >= 300 && Id <= 321) {
        return <img src="/rain.svg" alt="Rain Icon" />
      } else if (Id >= 500 && Id <= 531) {
        return <img src="/rain.svg" alt="Rain Icon" />
      } else if (Id >= 600 && Id <= 622) {
        return <img src="/snow.svg" alt="Snow Icon" />
      } else if (Id >= 700 && Id <= 781) {
        return <img src="/fog.svg" alt="Fog Icon" />
      } else if (Id >= 801 && Id <= 804) {
        return <img src="/cloudy.svg" alt="Cloudy Icon" />
      }
    }
    return (
      null
    );
  }


  return (
    <>
      {/* <Name>
        <div>{weatherData?.name}</div>
      </Name> */}
      <Temp>
        <div>{weatherData?.main.temp}°</div>
        <div>{weatherData?.weather[0].description}</div>
      </Temp>
      <Icon>
        {renderIcon()}
      </Icon>
    </>
  );
}

export default WeatherAPI;

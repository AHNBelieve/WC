const API_KEY = "674bc744607f1dcc62ba480a79132421";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

interface Weathers {
  coord: {
    lon: number; //위도
    lat: number; //경도도
  };
  weather: [
    // 날씨 정보보
    {
      id: number; // 날씨 아이디
      main: string; //
      description: string; //날씨 설명
      icon: string; //아이콘 코드
    }
  ];
  base: string; // 기상 관측 기지
  main: {
    // 주요 날씨 데이터
    temp: number; // 현재 온도 (섭씨)
    feels_like: number; // 체감 온도 (섭씨)
    temp_min: number; // 최저 온도
    temp_max: number; // 최고 온도
    pressure: number; // 기압 (hpa)
    humidity: number; // 습도 (%)
    sea_level: number; // 해수면 기압 (hpa)
    grnd_level: number; // 지면 기압(hpa)
  };
  visibility: number; // 가시 거리 (m)
  wind: {
    // 바람 정보
    speed: number; // 바람 속도 (m/s)
    deg: number; // 바람 방향 (degree)
  };
  clouds: {
    // 구름 정보
    all: number; // 구름의 전체 비율 (%)
  };
  dt: number; // 데이터 수집 기간 (Unix 타임스탬프)
  sys: {
    // 시스템 정보
    type: number; // 시스템 타입
    id: number; // 시스템 ID
    country: string; // 국가 코드
    sunrise: number; // 일출 시간 (Unix 타임스탬프)
    sunset: number; // 일몰 시간 (Unix 타임스탬프)
  };
  timezone: number; // 시간대(초)
  id: number; // 도시 ID
  name: string; // 도시 이름
  cod: number; // 응답 코드드
}

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
  setWeatherDataToSave: React.Dispatch<React.SetStateAction<number>>;
}

function WeatherAPI({ setWeatherDataToSave }: Props) {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({ lat, lon });
        },
        (error) => {
          console.error(`에러 코드: ${error.code}, 메시지: ${error.message}`);
        }
      );
    } else {
      console.log("이 브라우저는 Geolocation을 지원하지 않습니다.");
    }
  }, []);

  const getWeather = () => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location?.lat}&lon=${location?.lon}&appid=${API_KEY}&units=metric&lang=kr`
    ).then((response) => response.json());
  };

  const { data, isLoading } = useQuery<Weathers>("weatherData", getWeather, {
    enabled: !!location, // location이 설정된 경우에만 쿼리 실행
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  //setWeatherDataToSave -> 서버에 저장할 날씨 데이터만 세터하면됨됨

  return (
    <WeatherBoard>
      <MainWeather>
        <Name>
          <div>{data?.name}</div>
        </Name>
        <Temp>
          <div>{data?.main.temp}°</div>
          <div>{data?.weather[0].description}</div>
        </Temp>
        <Icon>
          <img
            src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
          />
        </Icon>
      </MainWeather>
      <SubWeather>
        <div>
          {data?.main.temp_max}
          <div>최고기온</div>
        </div>
        <div>
          {data?.main.temp_min}
          <div>최저기온</div>
        </div>
        <div>
          {data?.main.pressure}hpa<div>기압</div>
        </div>
        <div>
          {data?.main.humidity}%<div>습도</div>
        </div>
      </SubWeather>
    </WeatherBoard>
  );
}

export default WeatherAPI;

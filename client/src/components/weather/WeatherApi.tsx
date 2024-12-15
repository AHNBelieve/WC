// const API_KEY = "";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface Weathers {
    coord: {
        lon: number;    //위도
        lat: number;    //경도도
    },
    weather: [  // 날씨 정보보
        {
            id: number;  // 날씨 아이디
            main: string;   //
            description: string;    //날씨 설명
            icon: string;   //아이콘 코드
        }
    ],
    base: string;   // 기상 관측 기지
    main: { // 주요 날씨 데이터
        temp: number;   // 현재 온도 (섭씨)
        feels_like: number; // 체감 온도 (섭씨)
        temp_min: number;   // 최저 온도
        temp_max: number;   // 최고 온도
        pressure: number;   // 기압 (hpa)
        humidity: number;   // 습도 (%)
        sea_level: number;  // 해수면 기압 (hpa)
        grnd_level: number; // 지면 기압(hpa)
    },
    visibility: number; // 가시 거리 (m)
    wind: { // 바람 정보
        speed: number;  // 바람 속도 (m/s)
        deg: number;    // 바람 방향 (degree)
    },
    clouds: {   // 구름 정보
        all: number;    // 구름의 전체 비율 (%)
    },
    dt: number; // 데이터 수집 기간 (Unix 타임스탬프)
    sys: {  // 시스템 정보
        type: number;   // 시스템 타입
        id: number; // 시스템 ID
        country: string;    // 국가 코드
        sunrise: number;    // 일출 시간 (Unix 타임스탬프)
        sunset: number;     // 일몰 시간 (Unix 타임스탬프)
    },
    timezone: number;   // 시간대(초)
    id: number;     // 도시 ID
    name: string;   // 도시 이름
    cod: number;    // 응답 코드드
}

function WeatherAPI() {
    const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
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
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location?.lat}&lon=${location?.lon}&appid=${API_KEY}&units=metric`).then((response) => response.json());
    };

    const { data, isLoading } = useQuery<Weathers>("weatherData", getWeather, {
        enabled: !!location, // location이 설정된 경우에만 쿼리 실행
    });

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    console.log(data)
    return (<div>
        <h1>날씨 정보</h1>
        <p>도시: {data?.name}</p>
        <p>온도: {data?.main.temp} °C</p>
        <p>상태: {data?.weather[0].description}</p>
    </div>)
}

export default WeatherAPI;
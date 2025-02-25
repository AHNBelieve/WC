import axios from "axios";
import { WeathersResponse } from "../type";

// export const fetchWeatherData = async (
//   lat: number,
//   lon: number
// ): Promise<WeathersResponse> => {
//   const response = await fetch(
//     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
//       import.meta.env.VITE_WEATHER_API_KEY
//     }&units=metric&lang=kr`
//   );
//   if (!response.ok) {
//     throw new Error("날씨 데이터를 가져오는 데 실패했습니다.");
//   }
//   return response.json();
// };

export const fetchWeatherData = async (
  lat: number,
  lon: number
): Promise<WeathersResponse> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/weatherData?lat=${lat}&lon=${lon}`
    );
    return response.data;
  } catch (err) {
    throw new Error("날씨 데이터를 로드하는 데 실패했습니다.");
  }
};
export const fetchForeCastData = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/weatherData/forecast?lat=${lat}&lon=${lon}`
    );
    console.log(response);
    return response.data;
  } catch (err) {
    throw new Error("날씨 데이터를 로드하는 데 실패했습니다.");
  }
};
//애초에 geolocation이 비동기적으로 작동하는데 async를 적용할 수 없어서 그냥 Promise안에 가둬버렸다!
export const getLocation = (): Promise<{ lat: number; lon: number }> => {
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

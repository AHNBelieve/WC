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

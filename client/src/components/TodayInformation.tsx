import { useState } from "react";
import ToDo from "./todo/ToDo";
import WeatherAPI from "./weather/WeatherApi";

interface todoData {
  id: string;
  text: string;
  //boolean?
}

interface dailyData {
  todoDataArray: todoData[];
  memoData: string;
}

export default function TodayInformation() {
  const [dailyData, setDailyData] = useState<dailyData | null>(null);
  const [weatherDataToSave, setWeatherDataToSave] = useState({});

  //여기서 이제 데이터를 다 모아서 한번에 서버로 fetch
  //날씨는 한번만 보내도 되잖음
  //그래서 그냥 저장할 때에는 todoData만 Update해주고
  //처음에 생성할 때에 따른 초기 하루 데이터를 만들까 고민중중
  console.log(weatherDataToSave);
  return (
    <div>
      <WeatherAPI setWeatherDataToSave={setWeatherDataToSave}></WeatherAPI>
      <ToDo dailyData={dailyData} setDailyData={setDailyData}></ToDo>
    </div>
  );
}

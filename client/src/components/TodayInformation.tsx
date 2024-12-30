import { useEffect, useState } from "react";
import ToDo from "./todo/ToDo";
import WeatherAPI from "./weather/WeatherApi";
import { todoData } from "../type";
import { getDailyData } from "../api/testHandler";

export default function TodayInformation() {
  const [todoDataArray, setTodoDataArray] = useState<todoData[]>([]);
  const [weatherDataToSave, setWeatherDataToSave] = useState({});

  //여기서 이제 데이터를 다 모아서 한번에 서버로 fetch
  //날씨는 한번만 보내도 되잖음
  //그래서 그냥 저장할 때에는 todoData만 Update해주고
  //처음에 생성할 때에 따른 초기 하루 데이터를 만들까 고민중중
  //확인용
  useEffect(() => {
    const func = async () => {
      const response = await getDailyData();
      console.log(response);

      //여기서 서버의 데이터를 가져오면 됨
      if (response && response.data[0])
        setTodoDataArray(response.data[0].todoData as todoData[]);
        //지금은 [0]으로 첫 번째 인덱스만 가져오지만, 수정할 예정! 해당 유저의 하루 데이터만 받도록
    };

    func();
  }, []);

  console.log(todoDataArray, weatherDataToSave);
  return (
    <div>
      <WeatherAPI setWeatherDataToSave={setWeatherDataToSave}></WeatherAPI>
      <ToDo
        todoDataArray={todoDataArray}
        setTodoDataArray={setTodoDataArray}
      ></ToDo>
    </div>
  );
}

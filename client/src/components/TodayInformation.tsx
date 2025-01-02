import { useEffect, useState } from "react";
import ToDo from "./todo/ToDo";
import WeatherAPI from "./weather/WeatherApi";
import { todoData, weatherDataToSave } from "../type";
import {
  createDailyData,
  getDailyData,
  updateDailyData,
} from "../api/dailyData";
import { getToken } from "../supabase";

export default function TodayInformation() {
  //주요 변수들
  //todoDataArray -> 할 일 목록
  const [todoDataArray, setTodoDataArray] = useState<todoData[]>([]);
  //memoData -> 옆의 메모장
  const [memoData, setMemoData] = useState<string>("");
  //저장할 weatherData -> 프롭스로 weatherAPI에 전달하니까 거기서 setWeatherDataToSave로 저장
  const [weatherDataToSave, setWeatherDataToSave] =
    useState<weatherDataToSave | null>(null);

  //컴포넌트 상태에 관한 것
  const [isLoading, setIsLoading] = useState(false);

  //로그인 됐는지 안 됐는지
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const func = async () => {
      //이렇게 보내면 그냥 오늘 데이터 받는 것!
      try {
        const token = await getToken();
        if (!token) {
          setIsLogin(false);
          return;
        }
        setIsLogin(true);
        setIsLoading(true);
        const response = await getDailyData();

        //여기서 서버의 데이터를 가져오면 됨

        if (response && response.data) {
          setTodoDataArray(response.data.todoData as todoData[]);
          setMemoData(response.data.memoData as string);
        } else {
          //현재 오늘 데이터가 존재하지 않는 경우!
          //일단은 바로 오늘 데이터를 생성해놓는 걸로 했는데, 이거 버튼식으로 바꿔도 좋을듯
          if (weatherDataToSave) {
            console.log(weatherDataToSave);
            const response = await createDailyData();
            console.log(response);
          }
        }
        setIsLoading(false);
      } catch (err) {
        //이게 서버랑 같이 켜지다보니까 서버에 API요청 보내도 못 받는 경우가 있음
        //그런 경우에 해당해서 reload해주는게 적합하다고 판단함.
        window.location.reload();
        alert(err);
      }
    };

    func();
  }, []);

  //Update핸들러 이 핸들러를 통해서 데이터가 업데이트 된다.
  const updatingHandler = () => {
    const func = async () => {
      try {
        const response = await updateDailyData(todoDataArray, memoData);
        if (response) {
          alert("저장되었습니다!");
        }
      } catch (err) {
        console.log("업데이트 실패", err);
      }
    };
    func();
  };

  if (isLoading) {
    return <div>로딩중입니다~~</div>;
  }

  return (
    <div>
      <WeatherAPI setWeatherDataToSave={setWeatherDataToSave}></WeatherAPI>
      {isLogin ? (
        <div>
          <ToDo
            todoDataArray={todoDataArray}
            setTodoDataArray={setTodoDataArray}
            memoData={memoData}
            setMemoData={setMemoData}
          ></ToDo>
          <button onClick={updatingHandler}>업데이트!</button>
        </div>
      ) : null}
    </div>
  );
}

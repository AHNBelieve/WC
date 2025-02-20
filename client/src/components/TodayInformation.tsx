import { useEffect, useState } from "react";
import "./TodayInformation.css";
import ToDo from "./todo/ToDo";
import WeatherMain from "./weather/WeatherMain";
import { todoData, weatherDataToSave } from "../type";
import {
  createDailyData,
  getDailyData,
  updateDailyData,
} from "../api/dailyData";
import { getToken } from "../supabase";
import styled from "styled-components";
import ToDoMemo from "./todo/ToDoMemo";
import { AppProps, Loading } from "../App";

const Tododo = styled.div`
  grid-column: 2;
  grid-row: 1;
  display: grid;
  grid-template-columns: 3fr 36fr 11fr;
  grid-template-rows: 8fr 4fr 18fr 3fr;
`;

export default function TodayInformation({ setTheme }: AppProps) {
  //주요 변수들
  //todoDataArray -> 할 일 목록
  const [todoDataArray, setTodoDataArray] = useState<todoData[]>([]);
  //memoData -> 옆의 메모장
  const [memoData, setMemoData] = useState<string>("");
  //저장할 weatherData -> 프롭스로 weatherAPI에 전달하니까 거기서 setWeatherDataToSave로 저장
  const [weatherDataToSave, setWeatherDataToSave] = useState<
    weatherDataToSave | object
  >({});
  const [showToast, setShowToast] = useState<boolean>(false);
  //컴포넌트 상태에 관한 것
  const [isLoading, setIsLoading] = useState(false);

  //로그인 됐는지 안 됐는지
  const [isLogin, setIsLogin] = useState(false);

  const updatingHandler = () => {
    const func = async () => {
      try {
        console.log(weatherDataToSave, todoDataArray, memoData);
        await updateDailyData(
          weatherDataToSave as weatherDataToSave,
          todoDataArray as todoData[],
          memoData as string
        );
        if (showToast === false) {
          setShowToast(true); // 저장 완료 후 알림 표시
          setTimeout(() => setShowToast(false), 5000); // 3초 후 알림 숨기기
        }
      } catch (err) {
        console.log("업데이트 실패", err);
      }
    };
    func();
  };
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
        //이건 한번 해당 유저의 해당 달에 쓴 데이터를 뽑는 로직을 짜봄
        //month를 받아서 이를 적절히 넘겨줘야지 가능하다.

        if (response) {
          setTodoDataArray(response.todoData as todoData[]);
          setMemoData(response.memoData as string);
        } else {
          //현재 오늘 데이터가 존재하지 않는 경우!
          //일단은 바로 오늘 데이터를 생성해놓는 걸로 했는데, 이거 버튼식으로 바꿔도 좋을듯
          //여기까지 날씨 데이터를 못 받아오는 문제가 있다.
          //일단 메모를 저장하면 그 동안에는 무조건 날씨는 받아오므로 업데이트에 날씨 보냄
          //여기에 어떻게 처리를 해주면 좋을듯
          const response = await createDailyData();
          console.log(response);
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {showToast && <div className="toast">Save completed</div>}
      <WeatherMain setWeatherDataToSave={setWeatherDataToSave}></WeatherMain>
      {isLogin ? (
        <>
          <Tododo>
            <ToDo
              todoDataArray={todoDataArray}
              setTodoDataArray={setTodoDataArray}
              updatingHandler={updatingHandler}
              setTheme={setTheme}
            />
          </Tododo>
          <ToDoMemo
            memoData={memoData}
            setMemoData={setMemoData}
            updatingHandler={updatingHandler}
          />
        </>
      ) : null}
    </>
  );
}

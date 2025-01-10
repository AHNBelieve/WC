import axios from "axios";
import { getToken } from "../supabase";
import { todoData, weatherDataToSave } from "../type";

export const getDailyData = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(
      "http://localhost:3000/DailyData", // NestJS 서버의 엔드포인트
      {
        headers: {
          Authorization: `Bearer ${token}`, // 헤더에 Authorization 추가
        },
      }
    );
    console.log(response);
    return response;
  } catch (error: any) {
    if (error.code == "ERR_NETWORK") {
      throw new Error(error);
    }
  }
};

export const createDailyData = async () => {
  try {
    const token = await getToken();
    const response = await axios.post(
      "http://localhost:3000/DailyData",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // 헤더에 Authorization 추가
        },
      }
    );
    return response;

    //추후에 여기 빈 body안에 로컬스토리지 값을 넣던가 해도 될듯 자동 저장기능으로
  } catch {
    throw new Error("페칭에 실패했습니다.");
  }
};

export const updateDailyData = async (
  weatherDataToSave: weatherDataToSave,
  todoDataArray: todoData[],
  memoData: string
) => {
  try {
    const token = await getToken();
    const response = await axios.patch(
      "http://localhost:3000/DailyData",
      {
        weatherData: weatherDataToSave,
        todoData: todoDataArray,
        memoData: memoData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // 헤더에 Authorization 추가
        },
      }
    );

    return response;
  } catch (error) {
    console.log("Updating Faild", error);
  }
};
export const getMonthlyDailyData = async () => {
  //month를 받아서 해당 달에 해당 유저가 쓴 글에 대해서 정보를 받는다.
  //이후 이를 바탕으로 getDailyData에 date를 보내서 해당 유저의 해당 날짜 글을 확인도 가능
  try {
    const token = await getToken();
    const response = await axios.get(
      "http://localhost:3000/DailyData/month", // NestJS 서버의 엔드포인트
      {
        headers: {
          Authorization: `Bearer ${token}`, // 헤더에 Authorization 추가
        },
      }
    );
    const diaryDates = response.data.map((item: { date: string }) => item.date); // 날짜 배열 추출
    return diaryDates as string[]; //["2025-01-03", "2025-01-05"]형식
  } catch (err) {
    console.log(err);
  }
};

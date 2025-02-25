import axios from "axios";
import { getToken } from "../supabase";
import { todoData, weatherDataToSave } from "../type";

export const getDailyData = async (date?: string) => {
  try {
    const token = await getToken();
    if (date) {
      const response = await axios.get(
        `http://localhost:3000/DailyData?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 헤더에 Authorization 추가
          },
        }
      );
      return response.data;
    } else {
      const response = await axios.get(
        "http://localhost:3000/DailyData", // NestJS 서버의 엔드포인트
        {
          headers: {
            Authorization: `Bearer ${token}`, // 헤더에 Authorization 추가
          },
        }
      );
      return response.data;
    }
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

export const getMonthlyDailyData = async (date: Date) => {
  try {
    const token = await getToken();
    const month = date.getMonth() + 1; // 0부터 시작하므로 1을 더함
    const year = date.getFullYear();

    const response = await axios.get(
      `http://localhost:3000/DailyData/month?year=${year}&month=${month}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const diaryDates = response.data.map((item: { date: string }) => item.date);
    return diaryDates as string[];
  } catch (err) {
    console.log(err);
    return [];
  }
};

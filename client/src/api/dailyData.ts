import axios from "axios";
import { getToken } from "../supabase";
import { todoData } from "../type";

export const getDailyData = async () => {
  try {
    const token = await getToken();
    console.log(token);

    if (!token) {
      alert("로그인이 필요합니다.");
      return { data: null };
    }

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

    if (!token) {
      alert("로그인이 필요합니다.");
      return { data: null };
    }

    //추후에 여기 빈 body안에 로컬스토리지 값을 넣던가 해도 될듯 자동 저장기능으로
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
  } catch (err) {
    console.log(err);
  }
};

export const updateDailyData = async (
  todoDataArray: todoData[],
  memoData: string
) => {
  try {
    const token = await getToken();

    if (!token) {
      alert("로그인이 필요합니다.");
      return { data: null };
    }
    const response = await axios.patch(
      "http://localhost:3000/DailyData",
      {
        todoDataArray: todoDataArray,
        memoData: memoData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // 헤더에 Authorization 추가
        },
      }
    );

    return response;
  } catch (error: any) {
    console.log("Updating Faild", error);
  }
};

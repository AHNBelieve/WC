import axios from "axios";
import { getToken } from "../supabase";

export const getDailyData = async () => {
  try {
    const token = await getToken();

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
    return response;
  } catch (error: any) {
    console.error("Error fetching products:", error.message);
    alert("데이터를 가져오는 중 오류가 발생했습니다: " + error.message);
  }
};

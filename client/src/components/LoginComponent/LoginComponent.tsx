// src/components/LoginComponent.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase"; // Supabase 클라이언트 임포트
import { useRecoilValue } from "recoil";
import { toDoState } from "../../atoms";
import { getDailyData } from "../../api/testHandler";

const LoginComponent: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const recoilValue = useRecoilValue(toDoState);

  const handleLogin = async () => {
    try {
      // 구글 로그인 OAuth 시작
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      console.log(data);
      if (error) {
        throw new Error();
      }
      // JWT 토큰은 Supabase에서 자동으로 쿠키에 저장됨
    } catch (err: unknown) {
      // err가 Error인 경우를 처리
    }
  };
  //현재 로그인 됐는지 안 됐는지 파악하는 useEffect
  useEffect(() => {
    const func = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        console.log("안녕하세요. ", data);
        setIsLogin(true);
      } else {
        console.log("에러", error);
      }
    };
    func();
    setIsLoading(false);
  }, []);
  if (isLoading || isLogin) {
    return <button onClick={getDailyData}>테스트</button>;
  }
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <button onClick={handleLogin} className="login-btn">
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;

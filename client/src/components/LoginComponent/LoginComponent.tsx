// src/components/LoginComponent.tsx
import React, { useState } from "react";
import { supabase } from "../../supabase"; // Supabase 클라이언트 임포트
import SignupPopup from "../SignupPopup/SingupPopup";
import "./LoginComponent.css";

const LoginComponent: React.FC = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  //일반적인 로그인을 위한 변수
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //구글 로그인 핸들러
  const handleGoogleLogin = async () => {
    try {
      // 구글 로그인 OAuth 시작
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) {
        throw new Error();
      }
      // JWT 토큰은 Supabase에서 자동으로 쿠키에 저장됨
    } catch (err: unknown) {
      // err가 Error인 경우를 처리
      alert(err);
    }
  };
  const openSignupPopup = () => {
    setIsSignupOpen(true);
  };

  const closeSignupPopup = () => {
    setIsSignupOpen(false);
  };
  //일반적인 로그인 핸들러
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        // Supabase 에러 메시지에 따른 한국어 에러 메시지 매핑
        const errorMessage =
          {
            "Invalid login credentials":
              "이메일 또는 비밀번호가 올바르지 않습니다.",
            "Email not confirmed": "이메일 인증이 필요합니다.",
            "Invalid email or password":
              "이메일 또는 비밀번호가 올바르지 않습니다.",
            "Too many requests":
              "너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.",
            "Email rate limit exceeded":
              "이메일 전송 횟수가 초과되었습니다. 잠시 후 다시 시도해주세요.",
          }[error.message] || "로그인 중 오류가 발생했습니다.";

        alert(errorMessage);
        return;
      }

      console.log("로그인 성공!");
      window.location.reload();
    } catch (error) {
      alert("로그인 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      console.error("Login error:", error);
    }
  };
  return (
    <>
      <div className="login-card">
        <h2 className="login-title">로그인</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
        <button onClick={openSignupPopup} className="signup-button">
          회원가입
        </button>
        <div className="divider">
          <span>또는</span>
        </div>
        <button onClick={handleGoogleLogin} className="google-login-button">
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            className="google-icon"
          />
          Google로 로그인
        </button>
      </div>
      <SignupPopup isOpen={isSignupOpen} onClose={closeSignupPopup} />
    </>
  );
};

export default LoginComponent;

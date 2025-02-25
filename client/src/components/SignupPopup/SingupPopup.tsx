import React, { useState } from "react";
import { supabase } from "../../supabase";
import "./SingUpPopup.css";

interface SignupPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupPopup({ isOpen, onClose }: SignupPopupProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        const errorMessage =
          {
            "Password should be at least 6 characters":
              "비밀번호는 최소 6자 이상이어야 합니다.",
            "Email already registered": "이미 등록된 이메일입니다.",
            "Invalid email format": "올바르지 않은 이메일 형식입니다.",
            "Signup is disabled": "현재 회원가입이 비활성화되어 있습니다.",
            "Password is too weak":
              "비밀번호가 너무 취약합니다. 더 강력한 비밀번호를 사용해주세요.",
            "Email rate limit exceeded":
              "너무 많은 요청이 있었습니다. 잠시 후 다시 시도해주세요.",
            "User already registered": "이미 가입된 사용자입니다.",
          }[error.message] || "회원가입 중 오류가 발생했습니다.";

        alert(errorMessage);
        return;
      }
      alert("이메일에서 인증 후 Weather Calendar를 이용하세요!");
      onClose();
    } catch (error) {
      console.error("Error signing up:", error);
      alert("회원가입 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>회원가입</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">가입하기</button>
        </form>
      </div>
    </div>
  );
}

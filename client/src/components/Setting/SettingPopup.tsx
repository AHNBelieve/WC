import {
  Default,
  PastelGray,
  PastelRed,
  PastelOrange,
  PastelYellow,
  PastelGreen,
  PastelBlue,
  PastelPink,
  PastelPurple,
  PastelBrown,
} from "../../theme"; // 상위 디렉토리의 theme.ts 파일 참조
import { supabase } from "../../supabase";
import "./SettingPopup.css";
import { useState } from "react";
import { DefaultTheme } from "styled-components/dist/types";
const version = "0.0.1";

export default function SettingPopup({
  onClose,
  setTheme,
}: {
  onClose: () => void;
  setTheme: (theme: DefaultTheme) => void;
}) {
  const [selectedTheme, setSelectedTheme] = useState("light"); // 추가: 선택된 테마 상태 관리
  //날씨 권한 여부 확인 핸들러
  const handleResetWeatherPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          alert("위치를 정상적으로 불러오고 있습니다.");
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            alert(
              "위치 권한이 거부되었습니다. 우측 상단에서 권한을 다시 허용해주세요."
            );
          } else {
            alert("위치 권한 요청 중 오류가 발생했습니다.");
          }
        }
      );
    } else {
      alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
    }
  };
  //로그아웃 핸들러
  const onClickLogoutHandler = async () => {
    const confirmLogout = window.confirm("정말 로그아웃하시겠습니까?");

    if (confirmLogout) {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          throw error;
        }
        console.log("로그아웃 성공");
        window.location.reload(); // 로그아웃 후 페이지 새로 고침
      } catch (error) {
        console.error("로그아웃 중 오류 발생:", error);
      }
    } else {
      console.log("로그아웃 취소");
    }
  };
  //버그 확인 리포트 핸들러
  const openGitBugRepoert = () => {
    // 새 창을 열기 위해 window.open() 사용
    window.open("https://github.com/AHNBelieve/WC/issues/new", "_blank");
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // 추가: 테마 변경 핸들러
    const themeValue = event.target.value;
    setSelectedTheme(themeValue);

    // 선택된 테마에 따라 테마 설정
    switch (themeValue) {
      case "light":
        setTheme(Default);
        break;
      case "pastelGray":
        setTheme(PastelGray);
        break;
      case "pastelRed":
        setTheme(PastelRed);
        break;
      case "pastelOrange":
        setTheme(PastelOrange);
        break;
      case "pastelYellow":
        setTheme(PastelYellow);
        break;
      case "pastelGreen":
        setTheme(PastelGreen);
        break;
      case "pastelBlue":
        setTheme(PastelBlue);
        break;
      case "pastelPink":
        setTheme(PastelPink);
        break;
      case "pastelPurple":
        setTheme(PastelPurple);
        break;
      case "pastelBrown":
        setTheme(PastelBrown);
        break;
      default:
        setTheme(Default);
    }
  };

  return (
    <div className="setting-popup-overlay" onClick={onClose}>
      <div className="setting-popup-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="settings-title">Settings</h2>
        <div className="settings-section">
          <span>Weather Calender</span>
          <h5>Version: {version}</h5>
          <h5>Developed by IBelieve & Nunu</h5>
        </div>
        <div className="settings-section">
          <span>Weather</span>
          <button
            className="settings-button-weather"
            onClick={handleResetWeatherPermission}
          >
            Check Weather Permission
          </button>
          <select
            className="settings-select"
            value={selectedTheme}
            onChange={handleThemeChange}
          >
            {" "}
            {/* 변경: 선택된 테마와 핸들러 추가 */}
            <option value="Default">Default</option>
            <option value="pastelGray">Pastel Gray</option>
            <option value="pastelRed">Pastel Red</option>
            <option value="pastelOrange">Pastel Orange</option>
            <option value="pastelYellow">Pastel Yellow</option>
            <option value="pastelGreen">Pastel Green</option>
            <option value="pastelBlue">Pastel Blue</option>
            <option value="pastelPink">Pastel Pink</option>
            <option value="pastelPurple">Pastel Purple</option>
            <option value="pastelBrown">Pastel Brown</option>
          </select>
        </div>

        <div className="settings-section">
          <span>User</span>
          <button className="settings-button" onClick={onClickLogoutHandler}>
            Sign out
          </button>
          <button
            className="settings-button settings-outline"
            onClick={openGitBugRepoert}
          >
            Bug Report
          </button>
        </div>
      </div>
    </div>
  );
}

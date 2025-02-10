import { supabase } from "../../supabase";
import "./SettingPopup.css";
const version = "0.0.1";

export default function SettingPopup({ onClose }: { onClose: () => void }) {
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

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="setting-popup-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="settings-title">Settings</h2>
        <div className="settings-section">
          <span>Weather Calender</span>
          <h5>Version: {version}</h5>
        </div>
        <div className="settings-section">
          <span>Weather</span>
          <button
            className="settings-button-weather"
            onClick={handleResetWeatherPermission}
          >
            Check Weather Permission
          </button>
          <select className="settings-select">
            <option value="light">Light mode</option>
            <option value="dark">Dark mode</option>
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

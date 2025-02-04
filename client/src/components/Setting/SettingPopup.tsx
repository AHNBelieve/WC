import "./SettingPopup.css";

export default function SettingPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}></div>
    </div>
  );
}

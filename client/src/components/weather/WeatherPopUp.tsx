import "./WeatherPopUp.styles.css";
interface WeatherPopUpProp {
  onClose: () => void;
}

function WeatherPopUp({ onClose }: WeatherPopUpProp) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="weather-popup-box"
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
}

export default WeatherPopUp;

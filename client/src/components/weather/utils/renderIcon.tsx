import React from 'react';

export const renderIcon = (weatherId: number | undefined) => {
    const nowTime = new Date(Date.now());
    const currentTime = nowTime.getHours();
    if (weatherId) {
        if (weatherId === 800) {
            return (currentTime >= 18 || currentTime <= 6)
                ? <img src="/night_clear.png" alt="Night Clear Icon" />
                : <img src="/day_clear.png" alt="Day Clear Icon" />;
        } else if (weatherId >= 200 && weatherId <= 232) {
            return <img src="/rain_thunder.png" alt="Rain Thunder Icon" />;
        } else if (weatherId >= 300 && weatherId <= 321) {
            return <img src="/rain.png" alt="Rain Icon" />;
        } else if (weatherId >= 500 && weatherId <= 531) {
            return <img src="/rain.png" alt="Rain Icon" />;
        } else if (weatherId >= 600 && weatherId <= 622) {
            return <img src="/snow.png" alt="Snow Icon" />;
        } else if (weatherId >= 700 && weatherId <= 781) {
            return <img src="/fog.svg" alt="Fog Icon" />;
        } else if (weatherId >= 801 && weatherId <= 804) {
            return <img src="/cloudy.png" alt="Cloudy Icon" />;
        }
    }
    return null;
};
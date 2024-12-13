const API_KEY = "674bc744607f1dcc62ba480a79132421";


interface GeolocationCoordinates {
    latitude: number;
    longitude: number;
}

interface GeolocationPosition {
    coords: GeolocationCoordinates;
    timestamp: number;
}


function onGeoOk(position: GeolocationPosition) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
};
function onGeoError() {
    alert("Can't find you. No weather for you.");
}

export function getWeather() {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then((response) => response.json());
}


navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

import React, { memo, useCallback, useEffect, useState } from 'react'
import styles from './weather.module.css';

const Weather = memo(({ api }) => {
    const [weather, setWeather] = useState();
    const onGeoSuccess = async (position) => {
        const coords = position.coords;
        window.sessionStorage.setItem('coords', JSON.stringify({ lat: coords.latitude, lon: coords.longitude }));
    }
    const onGeoError = () => {
        alert("위치 접근에 허용하지 않으면, 현재 날씨 제공이 어렵습니다.");
        window.sessionStorage.setItem('coords', JSON.stringify({ lat: undefined, lon: undefined }));
    }
    const getWeather = useCallback(async () => {
        const coords = JSON.parse(window.sessionStorage.getItem('coords'));
        if (coords.lat !== undefined) {
            const { lat, lon } = coords;
            const res = await api.getWeather(lat, lon);
            const {
                name: location,
                main: {
                    temp
                },
                weather,
            } = res;
            setWeather({ location, temp: temp.toFixed(1), icon: weather[0].icon });
        }
    }, [api]);
    useEffect(() => {
        getWeather();
        const id = setInterval(() => {
            getWeather();
        }, 1000 * 60 * 60);
        return () => clearInterval(id);
    }, [getWeather]);

    useEffect(() => {
        if (!window.sessionStorage.getItem('coords')) {
            navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
        }
    }, []);

    return (
        <div className={styles.container}>
            {weather &&
                <>
                    <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weather" />
                    <div className={styles.flexColumn}>
                        <p>{`${weather.temp}℃`}</p>
                        <p>{weather.location}</p>
                    </div>
                </>
            }
        </div>
    )
});

export default Weather

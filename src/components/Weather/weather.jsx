import React, { memo, useCallback, useEffect, useState } from 'react'
import Loading from '../Loading/loading';
import styles from './weather.module.css';

const Weather = memo(({ api }) => {
    const [weather, setWeather] = useState();

    const onGeoSuccess = async (position) => {
        const coords = position.coords;
        window.sessionStorage.setItem('coords', JSON.stringify({ lat: coords.latitude, lon: coords.longitude }));
    }
    const onGeoError = () => {
        setWeather({ location: '🧚‍♀️: 위치를 찾을 수 없습니다. 날씨 제공을 원한다면, 추적에 허용하고 새로고침 해주세요.' });
        window.sessionStorage.setItem('coords', JSON.stringify({ lat: undefined, lon: undefined }));
    }
    const getWeather = useCallback(async () => {
        const coords = JSON.parse(window.sessionStorage.getItem('coords'));
        if (coords?.lat !== undefined) {
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

    const getCoords = useCallback(() => {
        navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
    }, []);

    useEffect(() => {
        getCoords();
        getWeather();
    }, [getWeather, getCoords]);

    return (
        <div className={styles.container}>
            {weather ?
                <>
                    {weather.icon && <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weather" />}
                    <div className={styles.flexColumn}>
                        {weather.temp && <p>{`${weather.temp}℃`}</p>}
                        <p className={!weather.temp && styles.msg}>{weather.location}</p>
                    </div>
                </> : <Loading />

            }
        </div>
    )
});
export default Weather

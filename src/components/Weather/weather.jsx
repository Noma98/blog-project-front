import React, { memo, useCallback, useEffect, useState } from 'react'
import Loading from '../Loading/loading';
import styles from './weather.module.css';

const Weather = memo(({ api }) => {
    const [weather, setWeather] = useState();

    const getWeather = useCallback(() => {
        const onGeoSuccess = async (position) => {
            const { latitude: lat, longitude: lon } = position.coords;
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
        const onGeoError = () => {
            setWeather({ location: 'π§ββοΈ: μμΉλ₯Ό μ°Ύμ μ μμ΅λλ€. λ μ¨ μ κ³΅μ μνλ€λ©΄, μΆμ μ νμ©νκ³  μλ‘κ³ μΉ¨ ν΄μ£ΌμΈμ.' });
        }
        navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
    }, [api])

    useEffect(() => {
        !weather && getWeather();
    }, [getWeather, weather])

    return (
        <div className={styles.container}>
            {weather ?
                <>
                    {weather.icon && <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weather" />}
                    <div className={styles.flexColumn}>
                        {weather.temp && <p>{`${weather.temp}β`}</p>}
                        <p className={!weather.temp ? styles.msg : undefined}>{weather.location}</p>
                    </div>
                </> : <Loading />

            }
        </div>
    )
});
export default Weather

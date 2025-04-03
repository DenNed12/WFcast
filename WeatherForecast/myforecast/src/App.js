import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import WeatherDisplay from './WeatherDisplay';
import CitySelector from './CitySelector';

const OPENWEATHER_API_KEY = '';
const YANDEX_MAPS_API_KEY = '';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Moscow');
  const [timeRange, setTimeRange] = useState('current');
  const [status, setStatus] = useState('idle');
  const [coordinates, setCoordinates] = useState({
    latitude: 55.7558,
    longitude: 37.6176,
  });

  // Запрос погоды при изменении координат
  useEffect(() => {
    if (!navigator.onLine) {
      setStatus('error');
      return;
    }

    const fetchWeather = async () => {
      setStatus('loading');
      try {
        const { latitude, longitude } = coordinates;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${OPENWEATHER_API_KEY}&units=metric`
        );
        setWeatherData(response.data);
        setStatus('success');
      } catch (error) {
        console.error("Error fetching weather data", error);
        setStatus('error');
      }
    };

    fetchWeather();
  }, [coordinates]); // Теперь зависит от координат, а не города

  // Обработчик клика по карте
  const handleMapClick = (e) => {
    const [longitude, latitude] = e.get('coords');
    setCoordinates({ latitude, longitude });
  };

  return (
    <div className="App">
      <h1>Weather Service</h1>

      {/* Выбор города через список */}
      <CitySelector setCity={setCity} />

      {/* Яндекс.Карта */}
      <div style={{ margin: '20px 0', height: '400px' }}>
        <YMaps query={{ apikey: YANDEX_MAPS_API_KEY }}>
          <Map
            defaultState={{ center: [55.7558, 37.6176], zoom: 5 }}
            width="100%"
            height="100%"
            onClick={handleMapClick}
          >
            {coordinates && (
              <Placemark
                geometry={[coordinates.latitude, coordinates.longitude]}
                options={{ preset: 'islands#redDotIcon' }}
              />
            )}
          </Map>
        </YMaps>
      </div>

      {/* Кнопки выбора временного промежутка */}
      <div>
        <button onClick={() => setTimeRange('current')}>Сейчас</button>
        <button onClick={() => setTimeRange('fiveDays')}>5 дней</button>
      </div>

      {/* Отображение статуса и данных */}
      {status === 'loading' && <p>Загрузка данных...</p>}
      {status === 'error' && <p>Ошибка! Проверьте интернет.</p>}
      {status === 'success' && weatherData && (
        <WeatherDisplay data={weatherData} timeRange={timeRange} />
      )}
    </div>
  );
}

export default App;

# 5-сабақ: WeatherDisplay компонентін құру

## Сабақтың мақсаты

Ауа райын көрсетуге арналған бөлек компонент құру және ауа райы белгішелерімен жұмыс.

## 1-қадам: Ауа райы белгішелері үшін утилиталар құру

```javascript
// src/utils/weatherIcons.js
import {
  Cloud,
  CloudFog,
  Sun,
  CloudRain,
  CloudDrizzle,
  CloudSnow,
  CloudLightning,
} from "lucide-react";

export const getWeatherIcon = (weatherMain) => {
  switch (weatherMain) {
    case "Clouds":
      return <Cloud size={64} />; // Бұлттар
    case "Clear":
      return <Sun size={64} />; // Ашық
    case "Rain":
      return <CloudRain size={64} />; // Жаңбыр
    case "Drizzle":
      return <CloudDrizzle size={64} />; // Сіркіреген жаңбыр
    case "Snow":
      return <CloudSnow size={64} />; // Қар
    case "Thunderstorm":
      return <CloudLightning size={64} />; // Найзағай
    case "Mist":
    case "Fog":
      return <CloudFog size={64} />; // Тұман
    default:
      return <Cloud size={64} />;
  }
};
```

## 2-қадам: WeatherDisplay компонентін құру

````jsx
// src/components/WeatherDisplay.jsx
import React from 'react'
import { getWeatherIcon } from '../utils/weatherIcons'

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) return null

  const { name, main, weather } = weatherData
  const weatherIcon = getWeatherIcon(weather[0].main)

  return (
    <div className="weather-display">
      <h2>{name}</h2>
      <div className="weather-info">
        {weatherIcon}
        <div className="temperature">
          <span className="temp-main">{Math.round(main.temp)}°C</span>
          <span className="temp-feel">Сезіледі {Math.round(main.feels_like)}°C</span>
        </div>
        <div className="conditions">
          <p>{weather[0].description}</p>
          <p>Ылғалдылық: {main.humidity}%</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherDisplay
```javascript
// src/components/WeatherDisplay.jsx
import React from 'react'
import { getWeatherIcon } from '../utils/weatherIcons'

const WeatherDisplay = ({ data }) => {
  if (!data) return null

  return (
    <div className="weather-display">
      <div className="location">
        <h2>{data.name}</h2>
      </div>
      <div className="temperature">
        {data.main && <h1>{Math.round(data.main.temp)}°C</h1>}
      </div>
      <div className="description">
        {data.weather && (
          <div>
            {getWeatherIcon(data.weather[0].main)}
            <p>{data.weather[0].description}</p>
          </div>
        )}
      </div>
      <div className="details">
        {data.main && (
          <>
            <div className="feels-like">
              <p>Ощущается как</p>
              <p className="bold">{Math.round(data.main.feels_like)}°C</p>
            </div>
            <div className="humidity">
              <p>Влажность</p>
              <p className="bold">{data.main.humidity}%</p>
            </div>
          </>
        )}
        {data.wind && (
          <div className="wind">
            <p>Ветер</p>
            <p className="bold">{Math.round(data.wind.speed)} м/с</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeatherDisplay
````

## Шаг 3: Стили для WeatherDisplay

```css
/* Добавить в App.css */
.weather-display {
  width: 100%;
  margin: 1rem auto;
  padding: 2rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.location h2 {
  font-size: 2rem;
  text-align: center;
  margin: 1rem 0;
}

.temperature h1 {
  font-size: 4rem;
  text-align: center;
}

.description {
  text-align: center;
  margin: 1rem 0;
}

.description p {
  font-size: 1.2rem;
  text-transform: capitalize;
  margin-top: 0.5rem;
}

.details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: center;
  margin-top: 2rem;
}

.details .bold {
  font-weight: 700;
  font-size: 1.2rem;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .details {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
```

## 4-қадам: App.js жаңарту

````jsx
// src/App.js
import React, { useState } from 'react'
import Background from './components/Background'
import SearchForm from './components/SearchForm'
import WeatherDisplay from './components/WeatherDisplay'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null)

  return (
    <div className="app">
      <Background />
      <div className="container">
        <h1>Ауа райы қосымшасы</h1>
        <SearchForm setWeatherData={setWeatherData} />
        <WeatherDisplay weatherData={weatherData} />
      </div>
    </div>
  )
}

export default App
```javascript
// В App.js обновить рендер
import WeatherDisplay from './components/WeatherDisplay'

// Заменить существующий блок отображения погоды на:
{data && !loading && <WeatherDisplay data={data} />}
````

## Проверка результата

1. Создан отдельный компонент для отображения погоды
2. Добавлены иконки для разных погодных условий
3. Реализовано отображение детальной информации
4. Добавлены адаптивные стили

## Результат урока

Полноценный компонент отображения погоды с иконками и детальной информацией.

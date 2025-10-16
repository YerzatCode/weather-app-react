# Полное руководство по разработке Weather App

## Этап 1: Базовая структура приложения

### 1. Создание проекта

```bash
npx create-react-app weather-app
cd weather-app
npm install axios lucide-react
```

### 2. Основной компонент App.js

```javascript
// src/App.js
import axios from "axios";
import { Cloud, CloudFog, Sun, Wind, CloudRain } from "lucide-react";
import { useState } from "react";
import "./App.css";
import Background from "./components/Background";

const API_KEY = "ваш_api_ключ";

const sky = [
  {
    main: "Clouds",
    description: "overcast clouds",
    icon: <Cloud size={64} />,
  },
  {
    main: "Clear",
    description: "clear sky",
    icon: <Sun size={64} />,
  },
  {
    main: "Rain",
    description: "rain",
    icon: <CloudRain size={64} />,
  },
  {
    main: "Mist",
    description: "mist",
    icon: <CloudFog size={64} />,
  },
];

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="app">
      <Background />
      <div className="container">{/* Здесь будет содержимое */}</div>
    </div>
  );
}

export default App;
```

### 3. Компонент Background

```javascript
// src/components/Background.jsx
import React from "react";

const Background = () => {
  return (
    <div className="background">
      <div className="overlay"></div>
    </div>
  );
};

export default Background;
```

### 4. Основные стили (App.css)

```css
/* src/App.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  width: 100%;
  height: 100vh;
  position: relative;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
}

.app:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}

.container {
  max-width: 700px;
  height: 700px;
  margin: auto;
  padding: 0 1rem;
  position: relative;
  top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url("./assets/sunset.jpg") no-repeat center center/cover;
  z-index: -1;
}

.background .overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
```

## Этап 2: Добавление функционала поиска

### 1. Форма поиска в App.js

```javascript
// Добавить в App.js
const searchLocation = (event) => {
  if (event.key === "Enter") {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setError("");
      })
      .catch((error) => {
        setError("Город не найден");
        setData(null);
      });
    setLocation("");
  }
};

// В компоненте добавить форму
<div className="search">
  <input
    value={location}
    onChange={(event) => setLocation(event.target.value)}
    onKeyPress={searchLocation}
    placeholder="Введите название города"
    type="text"
  />
</div>;
```

### 2. Стили для формы поиска

```css
/* Добавить в App.css */
.search {
  text-align: center;
  padding: 1rem;
}

input {
  padding: 0.7rem 1.5rem;
  font-size: 1.2rem;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.1);
  color: #f8f8f8;
  width: 100%;
  max-width: 400px;
}

::placeholder {
  color: #f8f8f8;
}
```

## Этап 3: Отображение данных о погоде

### 1. Компонент WeatherDisplay

```javascript
// src/components/WeatherDisplay.jsx
import React from "react";
import { getWeatherIcon } from "../utils/weatherIcons";

const WeatherDisplay = ({ data }) => {
  if (!data) return null;

  return (
    <div className="weather-display">
      <div className="location">
        <h2>{data.name}</h2>
      </div>
      <div className="temperature">
        {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
      </div>
      <div className="description">
        {data.weather ? (
          <div>
            {getWeatherIcon(data.weather[0].main)}
            <p>{data.weather[0].description}</p>
          </div>
        ) : null}
      </div>
      <div className="details">
        {data.main ? (
          <div className="feels-like">
            <p>Ощущается как</p>
            <p className="bold">{data.main.feels_like.toFixed()}°C</p>
          </div>
        ) : null}
        {data.main ? (
          <div className="humidity">
            <p>Влажность</p>
            <p className="bold">{data.main.humidity}%</p>
          </div>
        ) : null}
        {data.wind ? (
          <div className="wind">
            <p>Ветер</p>
            <p className="bold">{data.wind.speed.toFixed()} м/с</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WeatherDisplay;
```

### 2. Утилиты для иконок погоды

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
      return <Cloud size={64} />;
    case "Clear":
      return <Sun size={64} />;
    case "Rain":
      return <CloudRain size={64} />;
    case "Drizzle":
      return <CloudDrizzle size={64} />;
    case "Snow":
      return <CloudSnow size={64} />;
    case "Thunderstorm":
      return <CloudLightning size={64} />;
    case "Mist":
    case "Fog":
      return <CloudFog size={64} />;
    default:
      return <Cloud size={64} />;
  }
};
```

### 3. Стили для отображения погоды

```css
/* Добавить в App.css */
.weather-display {
  width: 100%;
  margin: 1rem auto;
  padding: 1rem;
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
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .details {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
```

## Этап 4: Интеграция с API

### 1. Сервис для работы с API

```javascript
// src/services/weatherApi.js
import axios from "axios";

const API_KEY = "ваш_api_ключ";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: "metric",
    lang: "ru",
  },
});

export const getWeatherByCity = async (city) => {
  try {
    const response = await weatherApi.get(`/weather`, {
      params: {
        q: city,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Город не найден");
  }
};

export default weatherApi;
```

### 2. Обновленный App.js с использованием сервиса

```javascript
// src/App.js
import { useState } from "react";
import "./App.css";
import Background from "./components/Background";
import WeatherDisplay from "./components/WeatherDisplay";
import { getWeatherByCity } from "./services/weatherApi";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      try {
        const weatherData = await getWeatherByCity(location);
        setData(weatherData);
        setError("");
      } catch (err) {
        setError("Город не найден");
        setData(null);
      } finally {
        setLoading(false);
        setLocation("");
      }
    }
  };

  return (
    <div className="app">
      <Background />
      <div className="container">
        <div className="search">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Введите название города"
            type="text"
          />
        </div>

        {loading && <div className="loading">Загрузка...</div>}
        {error && <div className="error">{error}</div>}
        {data && !loading && <WeatherDisplay data={data} />}
      </div>
    </div>
  );
}

export default App;
```

### 3. Дополнительные стили для состояний загрузки и ошибок

```css
/* Добавить в App.css */
.loading,
.error {
  text-align: center;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
}

.error {
  background: rgba(255, 0, 0, 0.1);
  color: #ff6b6b;
}

.loading {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
```

## Этап 5: Оптимизация приложения

### 1. Хук для работы с API

```javascript
// src/hooks/useWeather.js
import { useState, useCallback } from "react";
import { getWeatherByCity } from "../services/weatherApi";

export const useWeather = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = useCallback(async (city) => {
    setLoading(true);
    try {
      const weatherData = await getWeatherByCity(city);
      setData(weatherData);
      setError("");
    } catch (err) {
      setError("Город не найден");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    fetchWeather,
  };
};
```

### 2. ErrorBoundary компонент

```javascript
// src/components/ErrorBoundary.jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Что-то пошло не так</h2>
          <button onClick={() => window.location.reload()}>
            Обновить страницу
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

### 3. Оптимизированный WeatherDisplay

```javascript
// src/components/WeatherDisplay.jsx
import React, { memo } from "react";
import { getWeatherIcon } from "../utils/weatherIcons";

const WeatherDisplay = memo(({ data }) => {
  if (!data) return null;

  return (
    <div className="weather-display">
      {/* Содержимое компонента остается тем же */}
    </div>
  );
});

WeatherDisplay.displayName = "WeatherDisplay";

export default WeatherDisplay;
```

Этот код представляет собой полное пошаговое руководство по созданию погодного приложения на React. Каждый этап включает в себя все необходимые компоненты, стили и логику. Вы можете использовать этот код как основу для создания приложения, добавляя свои собственные улучшения и модификации.

Хотите, чтобы я добавил какие-то конкретные детали или объяснил какую-то часть подробнее?

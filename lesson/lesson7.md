# 7-сабақ: Қосымшаны оңтайландыру

## Сабақтың мақсаты

Қосымшаның өнімділігін оңтайландыру және қателерді өңдеуді қосу.

## 1-қадам: API-мен жұмыс істеуге арналған хук құру

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
      setError("Қала табылмады");
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

## 2-қадам: ErrorBoundary компонентін құру

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
    console.error("Қате:", error);
    console.error("Қате туралы ақпарат:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Бірдеңе дұрыс болмады</h2>
          <button
            onClick={() => window.location.reload()}
            className="reload-button"
          >
            Бетті жаңарту
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

## 3-қадам: WeatherDisplay компонентін оңтайландыру

```javascript
// src/components/WeatherDisplay.jsx
import React, { memo } from "react";
import { getWeatherIcon } from "../utils/weatherIcons";

const WeatherDisplay = memo(({ data }) => {
  if (!data) return null;

  return (
    <div className="weather-display">
      {/* Компоненттің мазмұны сол күйінде қалады */}
    </div>
  );
});

WeatherDisplay.displayName = "WeatherDisplay";

export default WeatherDisplay;
```

## 4-қадам: Қателерді өңдеу стильдерін қосу

```css
/* App.css файлына қосу */
.error-boundary {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 0, 0, 0.1);
  border-radius: 8px;
  margin: 1rem;
}

.reload-button {
  padding: 0.5rem 1rem;
  background: #fff;
  border: none;
  border-radius: 4px;
  margin-top: 1rem;
  cursor: pointer;
}

.reload-button:hover {
  background: #f0f0f0;
}

## Нәтижені тексеру

1. useWeather хукы құрылды
2. ErrorBoundary компоненті қосылды
3. WeatherDisplay компоненті оңтайландырылды
4. Қателерді өңдеу механизмі енгізілді

## Сабақтың нәтижесі

Оңтайландырылған және қателерді тиімді өңдейтін тұрақты жұмыс істейтін қосымша.
```

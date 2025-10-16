# 4-сабақ: Ауа райы API-мен интеграция

## Сабақтың мақсаты

Ауа райы API-мен байланысу және ауа райы деректерін алу.

## 1-қадам: API-мен жұмыс істеуге арналған сервис құру

```javascript
// src/services/weatherApi.js
import axios from "axios";

const API_KEY = "сіздің_api_кілтіңіз";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: "metric",
    lang: "kk",
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
    throw new Error("Қала табылмады");
  }
};

export default weatherApi;
```

## 2-қадам: App.js файлын API-мен жұмыс істеу үшін жаңарту

```javascript
// src/App.js
import { useState } from "react";
import "./App.css";
import Background from "./components/Background";
import { getWeatherByCity } from "./services/weatherApi";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      try {
        const weatherData = await getWeatherByCity(location);
        setData(weatherData);
        setError("");
      } catch (err) {
        setError("Қала табылмады");
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
            onKeyPress={handleSearch}
            placeholder="Қала атауын енгізіңіз"
            type="text"
          />
        </div>

        {loading && <div className="loading">Жүктелуде...</div>}
        {error && <div className="error">{error}</div>}
        {data && (
          <div className="weather-info">
            <h2>{data.name}</h2>
            <h1>{Math.round(data.main.temp)}°C</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
```

## 3-қадам: Ауа райын көрсетуге арналған стильдер қосу

```css
/* App.css файлына қосу */
.weather-info {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-top: 2rem;
}

.weather-info h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.weather-info h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
}
```

## Нәтижені тексеру

1. Ауа райы API-мен байланыс орнатылды
2. Қала бойынша ауа райын сұрау жүзеге асырылды
3. Қателерді өңдеу қосылды
4. Алынған деректер көрсетіледі

## Сабақтың нәтижесі

API-дан ауа райы деректерін ала алатын және көрсете алатын жұмыс істейтін қосымша.

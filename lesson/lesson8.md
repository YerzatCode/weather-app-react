# 8-сабақ: Өндіріске дайындық және орналастыру

## Сабақтың мақсаты

Қосымшаны жариялауға дайындау және оны интернетте орналастыру.

## 1-қадам: Құрастыруды оңтайландыру

```javascript
// .env.production
REACT_APP_API_KEY=сіздің_api_кілтіңіз
REACT_APP_API_URL=https://api.openweathermap.org/data/2.5

// .env.development
REACT_APP_API_KEY=сіздің_api_кілтіңіз
REACT_APP_API_URL=https://api.openweathermap.org/data/2.5
```

## 2-қадам: Ортам айнымалыларын пайдалану үшін weatherApi.js жаңарту

```javascript
// src/services/weatherApi.js
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_API_URL;

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

## Шаг 3: Настройка GitHub Pages

1. Установка пакета gh-pages:

```bash
npm install --save-dev gh-pages
```

2. Обновление package.json:

```json
{
  "name": "weather-app",
  "version": "0.1.0",
  "private": true,
  "homepage": "https://ваше-имя.github.io/weather-app",
  "dependencies": {
    // ... остальные зависимости
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

## Шаг 4: Создание production сборки и деплой

```bash
# Создание production сборки
npm run build

# Деплой на GitHub Pages
npm run deploy
```

## Шаг 5: Добавление файла 404.html

```html
<!-- public/404.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Weather App</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 1;

      var l = window.location;
      l.replace(
        l.protocol +
          "//" +
          l.hostname +
          (l.port ? ":" + l.port : "") +
          l.pathname
            .split("/")
            .slice(0, 1 + pathSegmentsToKeep)
            .join("/") +
          "/?/" +
          l.pathname
            .slice(1)
            .split("/")
            .slice(pathSegmentsToKeep)
            .join("/")
            .replace(/&/g, "~and~") +
          (l.search ? "&" + l.search.slice(1).replace(/&/g, "~and~") : "") +
          l.hash
      );
    </script>
  </head>
  <body></body>
</html>
```

## 6-қадам: Тексеру және тестілеу

1. Жергілікті өндірістік құрастыруды іске қосу:

```bash
serve -s build
```

2. Әртүрлі браузерлерде тексеру
3. Өнімділікті тестілеу
4. API жұмысын тексеру

## Нәтижені тексеру

1. Ортам айнымалылары орнатылған
2. Өндірістік құрастыру жасалған
3. Қосымша GitHub Pages-те орналастырылған
4. Тестілеу жүргізілген

## Сабақтың нәтижесі

Интернетте орналастырылған және барлық пайдаланушылар үшін қолжетімді қолдануға дайын қосымша.

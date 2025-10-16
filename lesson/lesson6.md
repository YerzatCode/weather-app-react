# 6-сабақ: Анимациялар және UI жақсарту

## Сабақтың мақсаты

Анимациялар қосу және пайдаланушы интерфейсін жақсарту.

## 1-қадам: Компоненттерге анимациялар қосу

```css
/* App.css файлына анимациялар қосу */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Анимацияларды компоненттерге қолдану */
.weather-display {
  animation: fadeIn 0.5s ease-out;
}

.description svg {
  animation: scaleIn 0.3s ease-out;
}

.loading {
  animation: fadeIn 0.3s ease-out;
}

.error {
  animation: fadeIn 0.3s ease-out;
}
```

## Шаг 2: Улучшение поисковой формы

```javascript
// src/components/SearchForm.jsx
import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location);
      setLocation("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Қала атауын енгізіңіз"
        type="text"
        className="search-input"
      />
      <button type="submit" className="search-button">
        Іздеу
      </button>
    </form>
  );
};

export default SearchForm;
```

## 3-қадам: Жақсартылған форма үшін стильдер

```css
/* App.css файлына қосу */
.search-form {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  max-width: 500px;
  margin: 0 auto;
}

.search-input {
  flex: 1;
  padding: 0.7rem 1.5rem;
  font-size: 1.2rem;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.1);
  color: #f8f8f8;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

.search-button {
  padding: 0.7rem 1.5rem;
  font-size: 1.2rem;
  border-radius: 25px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.search-button:active {
  transform: scale(0.98);
}
```

## Шаг 4: Обновление App.js

```javascript
// В App.js обновить импорты и компонент
import SearchForm from "./components/SearchForm";

// Обновить функцию поиска
const handleSearch = async (searchLocation) => {
  setLoading(true);
  try {
    const weatherData = await getWeatherByCity(searchLocation);
    setData(weatherData);
    setError("");
  } catch (err) {
    setError("Город не найден");
    setData(null);
  } finally {
    setLoading(false);
  }
};

// В return обновить форму поиска
<SearchForm onSearch={handleSearch} />;
```

## Нәтижені тексеру

1. Біркелкі анимациялар қосылды
2. Іздеу формасының интерфейсі жақсартылды
3. Іздеу батырмасы қосылды
4. Интерфейстің жауап беру қабілеті жақсартылды

## Сабақтың нәтижесі

Жақсартылған пайдаланушы интерфейсі және біркелкі анимациялары бар қосымша.

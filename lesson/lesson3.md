# 3-сабақ: Іздеу формасын құру

## Сабақтың мақсаты

Қала іздеу формасын және пайдаланушы енгізуін өңдеуді жүзеге асыру.

## 1-қадам: App.js файлына іздеу формасын қосу

```javascript
// src/App.js
function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      // Әзірше бос қалдырамыз, келесі сабақта толтырамыз
      setLocation("");
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
      </div>
    </div>
  );
}
```

## 2-қадам: Іздеу формасы үшін стильдер қосу

```css
/* App.css файлына қосу */
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

input:focus {
  outline: none;
}

::placeholder {
  color: #f8f8f8;
}
```

## 3-қадам: Жүктеу және қателер индикациясын қосу

```css
/* App.css файлына қосу */
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

## 4-қадам: App.js файлын жүктеу күйлерімен жаңарту

```javascript
// App.js файлына loading күйін қосу
const [loading, setLoading] = useState(false);

// return ішіне күйлерді көрсетуді қосу
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
    </div>
  </div>
);
```

## Нәтижені тексеру

1. Қала іздеу формасы жасалды
2. Форма үшін стильдер қосылды
3. Енгізуді өңдеу жүзеге асырылды
4. Жүктеу және қателер күйлері дайындалды

## Сабақтың нәтижесі

Пайдаланушы енгізуін өңдеу және күйлерді көрсету мүмкіндігі бар функционалды іздеу формасы.

# 2-сабақ: Background компонентін және негізгі құрылымды құру

## Сабақтың мақсаты

Фондық компонентті құру және қосымшаның негізгі құрылымын баптау.

## 1-қадам: Background компонентін құру

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

## 2-қадам: Фон үшін стильдер қосу

```css
/* App.css файлына қосу */
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

## 3-қадам: App.js файлын Background компонентімен жаңарту

```javascript
// src/App.js
import { useState } from "react";
import "./App.css";
import Background from "./components/Background";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="app">
      <Background />
      <div className="container">
        <h1>Ауа райы қосымшасы</h1>
      </div>
    </div>
  );
}

export default App;
```

## Нәтижені тексеру

1. Фон үшін жеке компонент жасалды
2. Фондық сурет үшін стильдер қосылды
3. Қосымшаның негізгі құрылымы баптаулы
4. Негізгі күйлер дайындалды

## Сабақтың нәтижесі

Әдемі фоны бар және React компоненттерінің негізгі құрылымы бар қосымша.

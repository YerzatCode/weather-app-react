# 1-сабақ: Жобаны орнату және негізгі құрылымын жасау

## Сабақтың мақсаты

Жаңа React жобасын құру және ауа райы қосымшасының негізгі құрылымын орнату.

## 1-қадам: Жоба құру

```bash
npx create-react-app weather-app
cd weather-app
npm install axios lucide-react
```

## 2-қадам: Негізгі App.js файлын құру

```javascript
// src/App.js
import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1>Ауа райы қосымшасы</h1>
      </div>
    </div>
  );
}

export default App;
```

## 3-қадам: Негізгі стильдер

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
```

## Нәтижені тексеру

Осы қадамдарды орындағаннан кейін сізде болуы керек:

1. Жұмыс істейтін React жобасы
2. Қажетті пакеттер орнатылған
3. Қосымшаның негізгі құрылымы
4. Негізгі стильдер

## Сабақтың нәтижесі

Даму ортасы баптаулы қосымшаның негізгі құрылымы.

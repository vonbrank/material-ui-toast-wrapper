# material-ui-toast-wrapper

Material UI 是 React 框架下最受欢迎的前端组件库之一，它在在 React 中实现了 Material Design。 

很多 Web 应用有在前端提供可堆叠的消息提示的需求，而 MUI 自带的 `Snackbar` 组件默认不提供堆叠功能。因此本项目提供一组自定义 React Hook 和 Provider，基于 MUI 的 `Snackbar` 和 `react-transition-group` 库实现了一个开箱即用了可堆叠消息提示组件。

![demo](https://vonbrank-images.oss-cn-hangzhou.aliyuncs.com/20230916-material-ui-toast-wrapper/mui-toast-wrapper-demo.gif)

## 安装

```sh
npm install material-ui-toast-wrapper
```

## 使用

### 添加 ToastProvider

```tsx
import React from "react";
import "./App.css";
import About from "./pages/About/About";
import { ToastProvider } from "../lib";

function App() {
  return (
    <ToastProvider>
      <About />
    </ToastProvider>
  );
}

export default App;

```

### 使用 useToast

```tsx
import React, { useEffect, useState } from "react";
import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";
import "./About.css";
import { useToast } from "../../../lib";
import { AlertColor } from "@mui/material";

const severities: AlertColor[] = ["success", "info", "warning", "error"];

const About = () => {
  const [count, setCount] = useState(0);

  const { showTemporaryText } = useToast();

  useEffect(() => {
    if (count > 0)
      showTemporaryText({
        message: `count is ${count}`,
        severity: severities[Math.floor(Math.random() * severities.length)],
      });
  }, [count]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default About;

```

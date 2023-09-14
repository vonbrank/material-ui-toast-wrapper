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

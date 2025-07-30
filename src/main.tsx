import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import WeatherContext from "./context/WeatherProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WeatherContext>
      <App />
    </WeatherContext>
  </StrictMode>
);

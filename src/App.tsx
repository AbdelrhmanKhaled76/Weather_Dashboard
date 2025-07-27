import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import WeatherCard from "./components/WeatherCard";
import type { WeatherData } from "./interfaces/weatherData";

const NORMAL_URL: string = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL: string = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY: string = import.meta.env.VITE_API_KEY;

function Params(city: string): URLSearchParams {
  return new URLSearchParams({
    q: city,
    appid: API_KEY,
    units: "metric",
  });
}
async function fetchingFunc(
  url: string,
  city: string
): Promise<WeatherData | void> {
  try {
    const res = await fetch(`${url}?${Params(city)}`);
    const data: WeatherData = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
function App() {
  const [london, setLondon] = useState<WeatherData | null>(null);
  useEffect(() => {
    Promise.all([
      fetchingFunc(NORMAL_URL, "London"),
      fetchingFunc(FORECAST_URL, "new york"),
    ])
      .then(([london, newYork]) => {
        console.log(london);
        setLondon(london ?? null);
        console.log(newYork);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Nav />
      <main className="container">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 py-10">
          <WeatherCard weatherData={london} />
          
        </div>
      </main>
    </>
  );
}

export default App;

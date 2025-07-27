import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import WeatherCard from "./components/WeatherCard";
import type { WeatherData } from "./interfaces/weatherData";

const URL: string = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY: string = import.meta.env.VITE_API_KEY;

function Params(city: string): URLSearchParams {
  return new URLSearchParams({
    q: city,
    appid: API_KEY,
    units: "metric",
  });
}
async function fetchingFunc(city: string): Promise<WeatherData | void> {
  try {
    const res = await fetch(`${URL}?${Params(city)}`);
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
      fetchingFunc("London"),
      fetchingFunc("new york"),
      fetchingFunc("tokyo"),
      fetchingFunc("sydney"),
    ])
      .then(([london, newYork, tokyo, sydney]) => {
        console.log(london);
        setLondon(london ?? null);
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

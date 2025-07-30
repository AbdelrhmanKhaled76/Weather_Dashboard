import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import WeatherCard from "./components/WeatherCard";
import type { WeatherData } from "./interfaces/weatherData";
import { useWeather } from "./hooks/useWeather";
import Footer from "./components/Footer";

function App() {
  const { NORMAL_URL, fetchingFunc } = useWeather();

  const [london, setLondon] = useState<WeatherData | null>(null);
  const [newYork, setNewYork] = useState<WeatherData | null>(null);
  const [tokyo, setTokyo] = useState<WeatherData | null>(null);
  const [sydney, setSydney] = useState<WeatherData | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [searchCity, setSearchCity] = useState<string>("");

  useEffect(() => {
    Promise.all([
      fetchingFunc<WeatherData>(NORMAL_URL, "London"),
      fetchingFunc<WeatherData>(NORMAL_URL, "New York"),
      fetchingFunc<WeatherData>(NORMAL_URL, "Tokyo"),
      fetchingFunc<WeatherData>(NORMAL_URL, "Sydney"),
    ])
      .then(([london, newYork, tokyo, sydney]) => {
        setLondon(london ?? null);
        setNewYork(newYork ?? null);
        setTokyo(tokyo ?? null);
        setSydney(sydney ?? null);
      })
      .catch((err) => console.error(err))
      .finally(() => setRefresh(false));
  }, [refresh]);

  // Optional: fetch data for searchCity (bonus feature)
  useEffect(() => {
    if (!searchCity) return;
    fetchingFunc(NORMAL_URL, searchCity).then((data) => {
      console.log("Search result:", data);
      // You can also show this as a new card or modal
    });
  }, [searchCity]);

  return (
    <>
      <Nav setRefresh={setRefresh} setSearchCity={setSearchCity} />
      <main className="container">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 py-10">
          <WeatherCard weatherData={london} />
          <WeatherCard weatherData={newYork} />
          <WeatherCard weatherData={tokyo} />
          <WeatherCard weatherData={sydney} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;

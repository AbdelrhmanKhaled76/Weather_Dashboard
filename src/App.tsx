import { useCallback, useEffect, useState } from "react";
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
  const [userLocationWeather, setUserLocationWeather] =
    useState<WeatherData | null>(null);

  const [refresh, setRefresh] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const loadDefaultCountries = useCallback(() => {
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
  }, [NORMAL_URL, fetchingFunc]);

  useEffect(() => {
    // Fetch user's current location weather
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        try {
          const res = await fetch(
            `${NORMAL_URL}?lat=${lat}&lon=${lon}&appid=${
              import.meta.env.VITE_API_KEY
            }&units=metric`
          );
          const data: WeatherData = await res.json();
          setUserLocationWeather(data);
        } catch (err) {
          console.error("Error fetching user location weather:", err);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );

    loadDefaultCountries();
  }, [refresh, loadDefaultCountries]);
  
  useEffect(() => {
    if (searchTerm === "") {
      loadDefaultCountries();
    }
  }, [searchTerm, loadDefaultCountries]);

  // Combine all data
  const allWeatherData = [
    ...(userLocationWeather ? [userLocationWeather] : []),
    london,
    newYork,
    tokyo,
    sydney,
  ].filter(Boolean) as WeatherData[];

  // Filter
  const filteredData = allWeatherData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Nav setRefresh={setRefresh} setSearchCity={setSearchTerm} />
      <main className="container">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 py-10">
          {filteredData.map((data, idx) => (
            <WeatherCard key={idx} weatherData={data} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;

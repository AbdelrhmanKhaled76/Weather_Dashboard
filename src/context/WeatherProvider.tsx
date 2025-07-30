import { createContext } from "react";

interface contextProps {
  NORMAL_URL: string;
  FORECAST_URL: string;
  Params: (city: string) => URLSearchParams;
  fetchingFunc: <T>(city: string, url: string) => Promise<T | void>;
  getWeatherIcon: (iconCode: string) => string;
}

export const WeatherContext = createContext<contextProps | null>(null);

const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
  const NORMAL_URL: string = "https://api.openweathermap.org/data/2.5/weather";
  const FORECAST_URL: string =
    "https://api.openweathermap.org/data/2.5/forecast";
  const API_KEY: string = import.meta.env.VITE_API_KEY;

  function Params(city: string): URLSearchParams {
    return new URLSearchParams({
      q: city,
      appid: API_KEY,
      units: "metric",
    });
  }
  async function fetchingFunc<T>(url: string, city: string): Promise<T | void> {
    try {
      const res = await fetch(`${url}?${Params(city)}`);
      const data: T = await res.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  const getWeatherIcon = (iconCode: string): string => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <WeatherContext.Provider
      value={{ NORMAL_URL, FORECAST_URL, Params, fetchingFunc, getWeatherIcon }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;

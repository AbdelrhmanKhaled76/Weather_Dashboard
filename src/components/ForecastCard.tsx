import { Cloud, Droplets, Wind } from "lucide-react";
import type { List } from "../interfaces/forecastData";
import { useWeather } from "../hooks/useWeather";

const ForecastCard = ({ WeatherList }: { WeatherList: List }) => {
  const { getWeatherIcon } = useWeather();
  return (
    <div className="p-5 bg-white rounded-xl transition-shadow duration-200 hover:shadow-md">
      {WeatherList ? (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold capitalize">
                {new Date(WeatherList.dt).toDateString()}
              </h4>
              <p className="text-black/60 capitalize text-sm">
                {WeatherList.weather[0].description}
              </p>
            </div>
            <div>
              <img
                src={getWeatherIcon(WeatherList.weather[0].icon) as string}
                alt={WeatherList?.weather[0].description}
              />
            </div>
          </div>
          <div className="flex gap-3 py-3">
            <p className="font-bold text-xl">
              {WeatherList.main.temp} <sup>o</sup>
            </p>
            <span className="text-black/60 text-lg">
              {WeatherList.main.feels_like} <sup>o</sup>
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Droplets className="w-4 text-blue-600" />
              <p className="text-sm opacity-75">{WeatherList.main.humidity}%</p>
            </div>
            <div className="flex gap-2">
              <Wind className="w-4 text-green-600" />
              <p className="text-sm opacity-75">
                {WeatherList.wind.speed} km/h
              </p>
            </div>
            <div className="flex gap-2">
              <Cloud className="w-4 text-blue-600" />
              <p className="text-sm opacity-75">{WeatherList.clouds.all}%</p>
            </div>
          </div>
        </>
      ) : (
        <div>loading ...</div>
      )}
    </div>
  );
};

export default ForecastCard;

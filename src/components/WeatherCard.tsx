import { Calendar, Cloud, Droplets, Eye, Gauge, Wind } from "lucide-react";
import type { WeatherData } from "../interfaces/weatherData";
import { useEffect, useState } from "react";

const WeatherCard = ({ weatherData }: { weatherData: WeatherData | null }) => {
  const [celsiusState, setCelsiusState] = useState<boolean>(false);

  // then when weatherData loads:

  return (
    <div className="rounded-xl overflow-hidden shadow w-full hover:shadow-lg transition-shadow duration-200">
      <div className="grid grid-rows-2">
        <div className="bg-gradient-to-r from-gray-400 to-gray-700 p-5  text-white">
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <h3 className="capitalize text-2xl font-semibold">
                {weatherData?.name}
              </h3>
              <span>{weatherData?.sys.country}</span>
            </div>
            <p className="capitalize">
              updated{" "}
              {new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <div className="flex items-center gap-4">
              <div className="p-4">
                <Cloud className="w-10 h-10" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold">
                  {celsiusState
                    ? weatherData?.main.temp
                    : (Number(weatherData?.main.temp) + 273.15).toFixed(2)}
                  <sup>o</sup>
                  <sub className="ms-1 cursor-pointer font-medium bg-white/30 text-sm px-2 py-1 rounded-2xl  text-center">
                    {celsiusState ? "C" : "F"}
                  </sub>
                </span>
                <p className="text-nowrap opacity-90 capitalize">
                  {weatherData?.weather[0].description}
                </p>
                <span className="text-nowrap text-xs opacity-70 capitalize">
                  feels like {weatherData?.main.feels_like}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 p-5">
          <div className="flex items-center gap-2">
            <div className="p-3 bg-blue-200/50 rounded">
              <Droplets className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex gap-1 flex-col">
              <p className="capitalize text-xs">humidity</p>
              <span className="font-bold opacity-80">65%</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-3 bg-green-200/50 rounded">
              <Wind className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex gap-1 flex-col text-nowrap">
              <p className="capitalize text-xs">humidity</p>
              <span className="font-bold opacity-80">12 km/h</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-3 bg-purple-200/50 rounded">
              <Gauge className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex gap-1 flex-col">
              <p className="capitalize text-xs">pressure</p>
              <span className="font-bold opacity-80">1013 hPa</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-3 bg-orange-200/50 rounded">
              <Eye className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex gap-1 flex-col">
              <p className="capitalize text-xs">Visibility</p>
              <span className="font-bold opacity-80">10 km</span>
            </div>
          </div>
          <button
            type="button"
            className="rounded-xl flex gap-3 items-center justify-center cursor-pointer bg-blue-100/70 w-full col-span-2 py-2 text-blue-700  font-semibold capitalize transition-colors duration-200 hover:bg-blue-200"
          >
            <Calendar className="w-5 h-5" />3 - day forecast
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

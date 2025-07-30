import { Calendar, Droplets, Eye, Gauge, Wind } from "lucide-react";
import type { WeatherData } from "../interfaces/weatherData";
import { useState } from "react";
import ForecastPopup from "./ForecastPopup";
import { useWeather } from "../hooks/useWeather";

const WeatherCard = ({ weatherData }: { weatherData: WeatherData | null }) => {
  const [celsiusState, setCelsiusState] = useState<boolean>(true);
  const [showForecast, setShowForecast] = useState<boolean>(false);

  const getBackgroundGradient = (description: string): string => {
    const desc = description.toLowerCase();
    if (desc.includes("clear")) return "from-blue-400 to-blue-600";
    if (desc.includes("cloud")) return "from-gray-400 to-gray-600";
    if (desc.includes("rain")) return "from-gray-500 to-gray-700";
    if (desc.includes("snow")) return "from-blue-300 to-blue-500";
    if (desc.includes("thunder")) return "from-purple-400 to-purple-600";
    return "from-blue-400 to-blue-600";
  };

  const { getWeatherIcon } = useWeather();
  return (
    <>
      <div className="rounded-xl overflow-hidden shadow w-full hover:shadow-lg transition-shadow duration-200">
        {weatherData ? (
          <div className="grid grid-rows-2">
            <div
              className={`bg-gradient-to-r ${getBackgroundGradient(
                weatherData?.weather[0].description as string
              )} p-5  text-white`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                  <h3 className="capitalize text-2xl font-semibold">
                    {weatherData?.name}
                  </h3>
                  <span>{weatherData?.sys.country}</span>
                </div>
                <p className="capitalize">
                  updated
                  {" " +
                    new Date().toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                </p>
                <div className="flex items-center gap-4">
                  <div className="p-4">
                    <img
                      src={getWeatherIcon(
                        weatherData?.weather[0].icon as string
                      )}
                      alt={weatherData?.weather[0].description}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-3xl font-bold">
                      {celsiusState
                        ? weatherData?.main.temp
                        : (
                            (Number(weatherData?.main.temp) * 9) / 5 +
                            32
                          ).toFixed()}
                      <sup>o</sup>
                      <sub
                        onClick={() => setCelsiusState((prev) => !prev)}
                        className="ms-1 cursor-pointer font-medium bg-white/30 text-sm px-2 py-1 rounded-2xl  text-center"
                      >
                        {celsiusState ? "C" : "F"}
                      </sub>
                    </span>
                    <p className="text-nowrap opacity-90 capitalize">
                      {weatherData?.weather[0].description}
                    </p>
                    <span className="text-nowrap text-xs opacity-70 capitalize">
                      feels like{" "}
                      {celsiusState
                        ? weatherData?.main.feels_like
                        : (Number(weatherData?.main.feels_like) * 9) / 5 + 32}
                      <sup>o</sup>
                      {celsiusState ? " C" : " F"}
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
                  <span className="font-bold opacity-80">
                    {weatherData?.main.humidity} %
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-3 bg-green-200/50 rounded">
                  <Wind className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex gap-1 flex-col text-nowrap">
                  <p className="capitalize text-xs">wind</p>
                  <span className="font-bold opacity-80">
                    {weatherData?.wind.speed} km/h
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-3 bg-purple-200/50 rounded">
                  <Gauge className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex gap-1 flex-col">
                  <p className="capitalize text-xs">pressure</p>
                  <span className="font-bold opacity-80">
                    {weatherData?.main.pressure} hPa
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-3 bg-orange-200/50 rounded">
                  <Eye className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex gap-1 flex-col">
                  <p className="capitalize text-xs">Visibility</p>
                  <span className="font-bold opacity-80">
                    {weatherData?.visibility} km
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowForecast(true)}
                type="button"
                className="rounded-xl flex gap-3 items-center justify-center cursor-pointer bg-blue-100/70 w-full col-span-2 py-2 text-blue-700  font-semibold capitalize transition-colors duration-200 hover:bg-blue-200"
              >
                <Calendar className="w-5 h-5" />3 - day forecast
              </button>
            </div>
          </div>
        ) : (
          <div>loading ...</div>
        )}
      </div>
      <ForecastPopup
        showForecast={showForecast}
        setShowForecast={setShowForecast}
        country={weatherData?.name as string}
      />
    </>
  );
};

export default WeatherCard;

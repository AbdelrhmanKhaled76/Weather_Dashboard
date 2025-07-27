import { Calendar, X } from "lucide-react";
import ForecastCard from "./ForecastCard";

const ForecastPopup = () => {
  return (
    <div className="bg-black/50 fixed z-30 top-0 left-0 h-screen w-screen flex justify-center items-center px-10">
      <div className="w-screen bg-white rounded-xl overflow-auto">
        <div className="border-b pb-5 border-black/10">
          <div className="p-5 flex justify-between">
            <div className="flex gap-3 items-center">
              <Calendar className="text-blue-600" />
              <div>
                <h3 className="text-xl font-semibold">3-Day forecast</h3>
                <span className="text-black/60 text-sm">London</span>
              </div>
            </div>
            <button type="button" className="cursor-pointer">
              <X className="w-10 h-10 text-black/50 hover:bg-gray-200 rounded-full p-3 transition-colors duration-200" />
            </button>
          </div>
        </div>
        <div className="bg-gray-100 grid grid-cols-3 gap-5 p-5">
          <ForecastCard />
        </div>
      </div>
    </div>
  );
};

export default ForecastPopup;

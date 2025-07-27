import React from "react";

const ForecastCard = () => {
  return (
    <div className="p-5 bg-white rounded-xl transition-shadow duration-200 hover:shadow-md">
      <div>
        <div>
          <h4 className="font-semibold capitalize">Wednesday, Jan 15</h4>
          <p className="text-black/60 capitalize text-sm">Partly cloudy</p>
        </div>
        
      </div>
    </div>
  );
};

export default ForecastCard;

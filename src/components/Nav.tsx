import { Cloud, RefreshCcw } from "lucide-react";

const Nav = () => {
  return (
    <nav className="w-screen shadow-md py-5">
      <div className="container flex justify-between md:items-center md:flex-row flex-col md:gap-0 gap-5">
        <div className="flex items-center gap-5">
          <div className="text-blue-600 bg-blue-100 p-3 rounded-xl">
            <Cloud className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-bold text-2xl capitalize">weather dashboard</h1>
            <p className="text-black/60 text-sm">
              Real-time weather data • Last updated 08:34 AM
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            className="border border-black/10 rounded-md px-7 py-2"
            placeholder="⌕ Search for a city..."
          />
          <button
            className="px-3 py-2 bg-blue-600 rounded-lg flex gap-3 text-white cursor-pointer transition-colors duration-200 hover:bg-blue-800"
            type="button"
          >
            <RefreshCcw className="w-5" />
            refresh
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

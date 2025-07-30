import { Cloud, RefreshCcw, Search } from "lucide-react";
import { useState } from "react";

interface NavProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchCity: React.Dispatch<React.SetStateAction<string>>;
}

const Nav = ({ setRefresh, setSearchCity }: NavProps) => {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    const trimmed = input.trim();
    if (trimmed) {
      setSearchCity(trimmed);
      setInput(""); // clear the input box
    } else {
      setSearchCity(""); // empty triggers reload
    }
  };

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
              Real-time weather data • Last updated{" "}
              {new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="border border-black/10 rounded-md px-4 py-2"
            placeholder="⌕ Search for a city..."
          />
          <button
            onClick={handleSearch}
            className="px-3 py-2 bg-green-600 rounded-lg flex items-center gap-2 text-white cursor-pointer transition-colors duration-200 hover:bg-green-800"
            type="button"
            title="Search"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
          <button
            onClick={() => {
              setRefresh(true);
              setSearchCity("");
            }}
            className="px-3 py-2 bg-blue-600 rounded-lg flex items-center gap-2 text-white cursor-pointer transition-colors duration-200 hover:bg-blue-800"
            type="button"
            title="Refresh data"
          >
            <RefreshCcw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

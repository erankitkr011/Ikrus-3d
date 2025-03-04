import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch, suggestions, onSelect }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative w-80 max-w-md mx-auto">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        size={20}
      />
      <input
        type="text"
        placeholder="Search models..."
        value={query}
        onChange={handleChange}
        className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />

      {suggestions.length > 0 && (
        <ul className="absolute w-full  mt-1 rounded-lg shadow-lg">
          {suggestions.map((model) => (
            <li
              key={model.id}
              className="p-2 cursor-pointer hover:bg-amber-50 hover:text-black"
              onClick={() => {
                setQuery(model.name);
                onSelect(model);
              }}
            >
              {model.highlightedName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

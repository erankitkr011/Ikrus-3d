import React, { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative w-50 max-w-md mx-auto">
      <motion.div
        className="absolute left-3 top-1/2 transform -translate-y-1/2"
        animate={{ x: isFocused ? 150 : 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Search className="text-gray-500" size={30} />
      </motion.div>
      <input
        type="text"
        placeholder="Search models..."
        value={query}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
    </div>
  );
};

export default SearchBar;
